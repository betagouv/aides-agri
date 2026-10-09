from django import forms


class SelectWithDisabledEmptyOption(forms.Select):
    def create_option(self, name, value, *args, attrs=None, **kwargs):
        option_dict = super().create_option(name, value, *args, attrs=attrs, **kwargs)
        if value == "":
            option_dict["attrs"].update({"disabled": True})
        return option_dict
