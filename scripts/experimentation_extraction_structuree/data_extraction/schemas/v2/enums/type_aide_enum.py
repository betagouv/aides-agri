from enum import Enum


class TypeAideEnum(str, Enum):
    ASSISTANCE = 'assistance'
    AVANTAGE_FISCAL = 'avantage fiscal'
    CONSEIL = 'conseil'
    ETUDE = 'étude'
    FINANCEMENT = 'financement'
    FORMATION = 'formation'
    INFORMATION = 'information'
    PRET = 'prêt'