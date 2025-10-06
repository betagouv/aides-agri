from typing import List

class ParserEngine():

    def __init__(self) -> None:
        pass
    
    def choose_parser_for_resource(self, resource_path: str):
        if resource_path.endswith(".pdf"):
            from data_extraction.adapters.pdf_extractors import PDFExtractor
            return PDFExtractor()
        else:
            from data_extraction.adapters.html_extractor import HTMLExtractor
            return HTMLExtractor()
    
    def parse_unique_resource(self, resource_path: str) -> str:
        parser = self.choose_parser_for_resource(resource_path)
        return parser.extract(resource_path)

    def parse_resource_pool(self, resource_pool: List[str]) -> str:
        parsed_contents = []
        for resource in resource_pool:
            parsed_content = self.parse_unique_resource(resource)
            parsed_contents.append(parsed_content)
        return "".join(parsed_contents)