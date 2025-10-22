from typing import Any, Dict, Optional
import json
import re

from browser_use import Agent, Browser, ChatOpenAI

from ..config.settings import ALBERT_API_KEY, ALBERT_BASE_URL, ALBERT_MODEL, LLM_TEMPERATURE, LLM_MAX_TOKENS, LLM_REQUEST_TIMEOUT
from ..models.data_models import AideAgricoleLegerResponse, AidesAgricolesResponse
from ..monitoring.tracing import trace_step


class WebAgentProcessor:
    """Web agent processor using browser-use for advanced web content extraction"""
    
    def __init__(self, llm: Optional[ChatOpenAI] = None):
        self.llm = llm or self._create_llm()
        self.browser = Browser(headless=True)
    
    def _create_llm(self) -> ChatOpenAI:
        """Create an instance of the Albert LLM"""
        return ChatOpenAI(
            model=ALBERT_MODEL,
            base_url=ALBERT_BASE_URL,
            temperature=LLM_TEMPERATURE,
            api_key=ALBERT_API_KEY
        )

    def _create_task(self, url: str) -> str:
            # Base task template for the agent
        return f"""
            Vous êtes un assistant spécialisé dans la veille de nouvelles aides et articles sur des sites web.
            Vous utiliserez EXCLUSIVEMENT l'url source suivante : {url}. Cet url contient un ensemble de blocs visuels, tous relatifs à des aides ou des articles d'information.
            """ + """

            COMPORTEMENT ATTENDU :
            Lister tous blocs d'information visibles (titre, description si elle existe) dans un fichier temporaire, et les retourner à l'utilisateur. Ne t'arrête pas avant d'avoir listé toutes les aides présentes sur la page.
            Utilisez le format JSON suivant pour structurer votre réponse :
                {
                    "titre": "Titre de l'aide",
                    "description": "Courte description si disponible",
                }
        """
    
    def _create_agent(self, url: str) -> Agent:
        """Create browser-use agent with structured output schema"""
        agent = Agent(
            task=self._create_task(url),
            browser=self.browser,
            llm=self.llm,
            use_vision=True,
            output_model_schema=AideAgricoleLegerResponse
        )
        return agent
    
    @trace_step("web_agent_extraction")
    async def process_content(self, url: str) -> Dict[str, Any]:
        """
        Extract content from URL using browser-use agent.
        
        Args:
            url: The URL to extract content from
            
        Returns:
            Dict with status, aides_identifiees, and optional resume/error
        """
        try:
            print(f"🤖 Starting web agent extraction for: {url}")
            self.agent = self._create_agent(url)

            # Run the agent
            history = await self.agent.run(max_steps=5)
            result = history.final_result()

            # Parse JSON response
            try:
                result = json.loads(str(result))
            except json.JSONDecodeError:
                # Fallback: try to extract JSON from response
                json_match = re.search(r'\{.*\}', str(result), re.DOTALL)
                if json_match:
                    result = json.loads(json_match.group())
                else:
                    result = {"aides_identifiees": [], "resume": "Erreur de parsing JSON"}
            
            return {
                "status": "success",
                **result
            }
                
        except Exception as e:
            print(f"❌ Error in web agent extraction: {e}")
            return {
                "status": "error",
                "error": str(e),
                "aides_identifiees": [],
                "url": url
            }


class WebAgentStandaloneProcessor:
    """Web agent processor using browser-use for advanced web content extraction"""
    
    def __init__(self, llm: Optional[ChatOpenAI] = None):
        self.llm = llm or self._create_llm()
        self.browser = Browser(headless=True)
    
    def _create_llm(self) -> ChatOpenAI:
        """Create an instance of the Albert LLM"""
        return ChatOpenAI(
            model=ALBERT_MODEL,
            base_url=ALBERT_BASE_URL,
            temperature=LLM_TEMPERATURE,
            api_key=ALBERT_API_KEY
        )

    def _create_task(self, url: str) -> str:
            # Base task template for the agent
        return f"""
            Vous êtes un assistant spécialisé dans la veille de nouvelles aides et articles sur des sites web.
            Vous utiliserez EXCLUSIVEMENT l'url source suivante : {url}. Cet url contient un ensemble de blocs visuels, tous relatifs à des aides ou des articles d'information.
            """ + """

            COMPORTEMENT ATTENDU :
            Lister tous blocs d'information visibles (titre, description si elle existe) dans un fichier temporaire, et les retourner à l'utilisateur. Ne t'arrête pas avant d'avoir listé toutes les aides présentes sur la page.
            Utilisez le format JSON suivant pour structurer votre réponse :
                {
                    "titre": "Titre de l'aide",
                    "description": "Courte description si disponible",
                    "date": "Date de publication ou de mise à jour",
                    "url_specifique": "URL spécifique à cette aide (doit être différente de l'URL source)"
                }
        """
    
    def _create_agent(self, url: str) -> Agent:
        """Create browser-use agent with structured output schema"""
        agent = Agent(
            task=self._create_task(url),
            browser=self.browser,
            llm=self.llm,
            use_vision=True,
            output_model_schema=AidesAgricolesResponse
        )
        return agent
    
    @trace_step("web_agent_extraction")
    async def process_content(self, url: str) -> Dict[str, Any]:
        """
        Extract content from URL using browser-use agent.
        
        Args:
            url: The URL to extract content from
            
        Returns:
            Dict with status, aides_identifiees, and optional resume/error
        """
        try:
            print(f"🤖 Starting web agent extraction for: {url}")
            self.agent = self._create_agent(url)

            # Run the agent
            history = await self.agent.run(max_steps=5)
            result = history.final_result()

                        # Parse JSON response
            try:
                result = json.loads(str(result))
            except json.JSONDecodeError:
                # Fallback: try to extract JSON from response
                json_match = re.search(r'\{.*\}', str(result), re.DOTALL)
                if json_match:
                    result = json.loads(json_match.group())
                else:
                    result = {"aides_identifiees": [], "resume": "Erreur de parsing JSON"}
            
            return {
                "status": "success",
                **result
            }
                
        except Exception as e:
            print(f"❌ Error in web agent extraction: {e}")
            return {
                "status": "error",
                "error": str(e),
                "aides_identifiees": [],
                "url": url
            }