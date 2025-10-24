"""
Chunk Classifier Module

This module provides functionality to classify PDF chunks into predefined categories
using Albert LLM with structured output.
"""

from typing import List, Dict
from pydantic import BaseModel, Field

from data_extraction.adapters.structured_extractors.albert_structured_extractor import AlbertStructuredExtractor
from data_extraction.core.chunk_classifier import ChunkClassifier
from data_extraction.prompts.classification_prompts import CLASSIFICATION_SYSTEM_PROMPT, build_chunk_classification_user_prompt


class Categorie(BaseModel):
    """Pydantic model for classification output"""
    categorie: str = Field(title="Catégorie de classification")


class AlbertChunkClassifier(ChunkClassifier):
    """
    Classifies text chunks using Albert LLM with Langfuse prompts.
    """
    
    def __init__(
        self, 
        prompt_name: str = "Classification",
        prompt_label: str = "latest",
        model_name: str = "albert-large",
        temperature: float = 0.2
    ):
        """
        Initialize the classifier.
        
        Args:
            prompt_name: Name of the Langfuse prompt
            prompt_label: Label/version of the prompt
            model_name: Albert model to use (albert-small or albert-large)
            temperature: Sampling temperature for the model
        """
        self.prompt_name = prompt_name
        self.prompt_label = prompt_label
        self.model_name = model_name
        self.temperature = temperature
        
        self.llm = AlbertStructuredExtractor(Categorie)
    
    def classify_chunk(
        self,
        chunk: str,
        title: str,
        previous_chunks: str = "No chunk is available.",
        next_chunks: str = "No chunk is available."
    ) -> Dict[str, str]:
        """
        Classify a single chunk.
        
        Args:
            chunk: The text chunk to classify
            title: Title/header of the chunk
            previous_chunks: Context from previous chunks
            next_chunks: Context from next chunks
            
        Returns:
            Dictionary with 'categorie' key containing the classification
        """
        # Compile prompt with context
        system_prompt = CLASSIFICATION_SYSTEM_PROMPT
        user_prompt = build_chunk_classification_user_prompt(
            title=title, 
            previous_chunks=previous_chunks, 
            chunk=chunk, 
            next_chunks=next_chunks
        )
        
        # Get structured output from LLM
        answer = self.llm.get_structured_output(
            self.model_name,
            system_prompt=system_prompt,
            user_message=user_prompt,
            temperature=self.temperature
        )
        
        return answer.get_json()
    
    def classify_chunks(
        self,
        chunks: List[Dict[str, str]],
        window_size: int = 2
    ) -> List[Dict[str, str]]:
        """
        Classify multiple chunks with context windows.
        
        Args:
            chunks: List of chunks with 'title' and 'content' keys
            window_size: Number of surrounding chunks to use as context
            
        Returns:
            List of dictionaries with original chunk data plus 'categorie' key
        """
        classified_chunks = []
        no_chunk_msg = "No chunk is available."
        
        for i, chunk_obj in enumerate(chunks):
            # Get context window
            if i == 0:
                prev_chunks = no_chunk_msg
            else:
                start_idx = max(0, i - window_size)
                prev = chunks[start_idx:i]
                prev_chunks = "\n\n".join([c['content'] for c in prev])
            
            if i >= len(chunks) - 1:
                next_chunks = no_chunk_msg
            else:
                end_idx = min(len(chunks), i + 1 + window_size)
                next = chunks[i + 1:end_idx]
                next_chunks = "\n\n".join([c['content'] for c in next])
            
            # Classify
            classification = self.classify_chunk(
                chunk=chunk_obj['content'],
                title=chunk_obj['title'],
                previous_chunks=prev_chunks,
                next_chunks=next_chunks
            )
            
            # Combine with original chunk data
            result = {
                'title': chunk_obj['title'],
                'content': chunk_obj['content'],
                'categorie': classification['categorie']
            }
            classified_chunks.append(result)
        
        return classified_chunks
    
    def group_by_category(
        self,
        classified_chunks: List[Dict[str, str]]
    ) -> Dict[str, List[Dict[str, str]]]:
        """
        Group classified chunks by their category.
        
        Args:
            classified_chunks: List of classified chunks
            
        Returns:
            Dictionary mapping category names to lists of chunks
        """
        grouped = {}
        for chunk in classified_chunks:
            category = chunk.get('categorie', 'autre')
            if category not in grouped:
                grouped[category] = []
            grouped[category].append({
                'title': chunk['title'],
                'content': chunk['content']
            })
        return grouped
