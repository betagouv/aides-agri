#!/bin/env bash

zip -o data/logos.zip data/*.png
scalingo run --app aides-agri-prod -f data/logos.zip bash
