#!/usr/bin/env bash
(cd javascript-analyzer && npm i) \
&& \
(cd javascript-analyzer-and-renderer-harness && npm i) \
&& \
(cd Processors && npm i) \
&& \
(cd Renderer && npm i)