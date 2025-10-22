"""
Example script demonstrating how to use the PDF chunker and classifier modules.

This script shows how to:
1. Parse and chunk a PDF file
2. Classify the chunks
3. Display and group results
"""

from pdf_chunker import HierarchicalPDFChunker
from chunk_classifier import ChunkClassifier
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()


def main():
    # Example PDF path - replace with your own
    pdf_path = "sample_pdf/agence_eau.pdf"
    
    print("=" * 80)
    print("PDF Chunk Classification Example")
    print("=" * 80)
    
    # Step 1: Parse and chunk the PDF
    print("\n1. Parsing and chunking PDF...")
    chunker = HierarchicalPDFChunker()
    chunks = chunker.chunk_file(pdf_path)
    print(f"   ✓ Extracted {len(chunks)} chunks")
    
    # Display first few chunks
    print("\n   First 3 chunks:")
    for i, chunk in enumerate(chunks[:3], 1):
        title = chunk['title'][:60] + "..." if len(chunk['title']) > 60 else chunk['title']
        content_preview = chunk['content'][:80].replace('\n', ' ')
        print(f"   {i}. {title}")
        print(f"      Preview: {content_preview}...")
    
    # Step 2: Initialize classifier
    print("\n2. Initializing classifier...")
    classifier = ChunkClassifier(
        model_name="albert-small",
        temperature=0.2
    )
    print("   ✓ Classifier ready")
    
    # Step 3: Classify chunks
    print("\n3. Classifying chunks...")
    classified_chunks = []
    
    # For demo purposes, let's classify just the first 5 chunks
    # Remove the [:5] to classify all chunks
    for i, chunk_obj in enumerate(chunks[:5], 1):
        print(f"   Classifying chunk {i}/{min(5, len(chunks))}...", end=" ")
        
        # Get context
        prev_chunks, next_chunks = chunker.get_context_window(chunks, i-1, window_size=2)
        
        # Classify
        classification = classifier.classify_chunk(
            chunk=chunk_obj['content'],
            title=chunk_obj['title'],
            previous_chunks=prev_chunks,
            next_chunks=next_chunks
        )
        
        classified_chunks.append({
            'title': chunk_obj['title'],
            'content': chunk_obj['content'],
            'categorie': classification['categorie']
        })
        
        print(f"✓ {classification['categorie']}")
    
    # Step 4: Group by category
    print("\n4. Grouping results by category...")
    grouped = classifier.group_by_category(classified_chunks)
    
    print("\n   Categories found:")
    for category, chunks_in_cat in grouped.items():
        print(f"   - {category}: {len(chunks_in_cat)} chunks")
    
    # Step 5: Display detailed results
    print("\n5. Detailed results:")
    print("-" * 80)
    
    for category, chunks_in_cat in grouped.items():
        print(f"\n📁 {category.upper()}")
        print("-" * 80)
        for i, chunk in enumerate(chunks_in_cat, 1):
            print(f"\n  {i}. {chunk['title']}")
            content_preview = chunk['content'][:200].replace('\n', ' ')
            print(f"     {content_preview}...")
    
    # Step 6: Save results to JSON
    print("\n6. Saving results...")
    output_file = "classification_results.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(classified_chunks, f, ensure_ascii=False, indent=2)
    print(f"   ✓ Results saved to {output_file}")
    
    print("\n" + "=" * 80)
    print("Example completed successfully!")
    print("=" * 80)


if __name__ == "__main__":
    main()
