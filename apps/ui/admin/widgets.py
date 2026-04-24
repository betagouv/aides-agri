from django import forms


class ArrayFieldCheckboxSelectMultiple(forms.SelectMultiple):
    def format_value(self, value):
        """Return selected values as a list."""
        if value is None and self.allow_multiple_selected:
            return []
        elif self.allow_multiple_selected:
            value = [v for v in value.split(",")]

        if not isinstance(value, (tuple, list)):
            value = [value]

        results = [str(v) if v is not None else "" for v in value]
        return results
