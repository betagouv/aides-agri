from typing import Dict, Any, List, Optional, Union
from pydantic import BaseModel
from pydantic.fields import FieldInfo
import types

def generate_llm_schema(model_class: type[BaseModel]) -> Dict[str, Any]:
    """
    Generate a JSON schema for LLM prompting from a Pydantic model.
    
    This function extracts field names, titles, descriptions, and examples
    from both the main model and its nested entity models to create a
    comprehensive schema suitable for LLM instruction prompts.
    
    Args:
        model_class: A Pydantic BaseModel class
        
    Returns:
        Dictionary containing the structured schema with field information
    """
    schema = {}
    
    # Get the model's field information
    for field_name, field_info in model_class.model_fields.items():
        field_data = _extract_field_data(field_name, field_info)
        
        # If the field references another Pydantic model, extract its subfields
        field_type = _get_field_type(field_info)
        if field_type and _is_pydantic_model(field_type):
            field_data.update(_extract_subfields(field_type))
        
        schema[field_name] = field_data
    
    return schema


def _extract_field_data(field_name: str, field_info: FieldInfo) -> Dict[str, Any]:
    """Extract basic field information (title, description) from a Pydantic field."""
    field_data = {
        "description": field_info.description or "",
    }
    
    # Add title if it exists
    if hasattr(field_info, 'title') and field_info.title:
        field_data["title"] = field_info.title
    
    # Add examples
    examples_data = _get_examples_from_field(field_info)
    if examples_data:
        field_data.update(examples_data)
    
    return field_data


def _extract_subfields(model_class: type[BaseModel]) -> Dict[str, Any]:
    """Extract subfield information from a nested Pydantic model."""
    subfields = {}
    
    for subfield_name, subfield_info in model_class.model_fields.items():
        subfield_data = {
            "description": subfield_info.description or "",
        }
        
        # Add title if it exists
        if hasattr(subfield_info, 'title') and subfield_info.title:
            subfield_data["title"] = subfield_info.title
        
        # Add examples
        examples_data = _get_examples_from_field(subfield_info)
        if examples_data:
            subfield_data.update(examples_data)
            
        subfields[subfield_name] = subfield_data
    
    return subfields


def _get_field_type(field_info: FieldInfo) -> Optional[type]:
    """Extract the actual type from a field, handling Union types (e.g., Type | None)."""
    annotation = field_info.annotation
    
    if annotation is None:
        return None
    
    # Handle Union types (e.g., SomeModel | None)
    # Check for both typing.Union and types.UnionType (Python 3.10+ | syntax)
    is_union = (
        (hasattr(annotation, '__origin__') and annotation.__origin__ is Union) or
        isinstance(annotation, types.UnionType)
    )
    
    if is_union and hasattr(annotation, '__args__'):
        # Get the first non-None type from the Union
        for arg in annotation.__args__:
            if arg is not type(None):
                return arg
    
    return annotation


def _is_pydantic_model(type_hint: type) -> bool:
    """Check if a type is a Pydantic BaseModel subclass."""
    try:
        return (
            isinstance(type_hint, type) and 
            issubclass(type_hint, BaseModel)
        )
    except TypeError:
        return False


def _get_examples_from_field(field_info: FieldInfo) -> Dict[str, Any]:
    """Extract examples from a Pydantic field's metadata."""
    examples = []
    
    # Check for examples in the field's json_schema_extra
    if hasattr(field_info, 'json_schema_extra') and field_info.json_schema_extra:
        if isinstance(field_info.json_schema_extra, dict):
            json_examples = field_info.json_schema_extra.get('examples', [])
            if isinstance(json_examples, list):
                examples.extend(json_examples)
    
    # Check for examples directly in the field
    if hasattr(field_info, 'examples') and field_info.examples:
        if isinstance(field_info.examples, list):
            examples.extend(field_info.examples)
    
    # Also check other common locations for examples
    for attr_name in ['example', 'examples']:
        if hasattr(field_info, attr_name):
            attr_value = getattr(field_info, attr_name)
            if attr_value is not None:
                if isinstance(attr_value, list):
                    examples.extend(attr_value)
                else:
                    examples.append(str(attr_value))
    
    return {"examples": examples} if examples else {}


def generate_instruction_schema_dict(model_class: type[BaseModel]) -> Dict[str, Any]:
    """
    Generate a schema dictionary formatted specifically for instruction prompts.
    
    This creates a structure similar to the one shown in the instruction_prompts.py file,
    with field names as keys and dictionaries containing title, description and examples.
    
    Args:
        model_class: A Pydantic BaseModel class
        
    Returns:
        Dictionary in the format expected by LLM instruction prompts
    """
    llm_schema = generate_llm_schema(model_class)
    instruction_dict = {}
    
    for field_name, field_data in llm_schema.items():
        # Create the structure for each field
        field_entry = {
            "description": field_data.get("description", ""),
        }
        
        # Add title if it exists
        if "title" in field_data:
            field_entry["title"] = field_data["title"]
        
        # Add examples if they exist
        if "examples" in field_data and field_data["examples"]:
            field_entry["examples"] = field_data["examples"]
        
        # Add any subfields
        for key, value in field_data.items():
            if key not in ["description", "examples", "title"] and isinstance(value, dict):
                # This is a subfield
                subfield_entry = {
                    "description": value.get("description", ""),
                }
                
                # Add title for subfield if it exists
                if "title" in value:
                    subfield_entry["title"] = value["title"]
                    
                if "examples" in value and value["examples"]:
                    subfield_entry["examples"] = value["examples"]
                
                field_entry[key] = subfield_entry
        
        instruction_dict[field_name] = field_entry
    
    return instruction_dict


def format_schema_for_prompt(model_class: type[BaseModel]) -> str:
    """
    Format the schema as a JSON string suitable for inclusion in LLM prompts.
    
    Args:
        model_class: A Pydantic BaseModel class
        
    Returns:
        Formatted JSON string representation of the schema
    """
    import json
    schema_dict = generate_instruction_schema_dict(model_class)
    return json.dumps(schema_dict, indent=2, ensure_ascii=False)