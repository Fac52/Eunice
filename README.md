# Eunice [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgElementForYaml/createArrows/testcase.svg?sanitize=true)](Renderer/getSvgElementForYaml/createArrows/testcase.svg)

[![Build Status](https://travis-ci.org/DevSnicket/Eunice.svg?branch=master)](https://travis-ci.org/DevSnicket/Eunice) [![Coverage Status](https://coveralls.io/repos/github/DevSnicket/Eunice/badge.svg?branch=master&c=1)](https://coveralls.io/github/DevSnicket/Eunice?branch=master)

## Premise

DevSnicket Eunice is a system of utilities based on the premise that unidirectional dependencies can be beneficial to structure and modularity in software. Euince's approach isn't limited to direct dependencies, but includes indirect dependencies as well.

[try out Eunice on Eunice 🐶🥫](https://devsnicket.github.io/Eunice-harnesses/Renderer/harness.html) ([created with](dogfooding/generate.sh))

## Stacks

Fundamental to Eunince is the act of defining stacks. When its indended that an item is to be dependent upon another item, the first item is placed above the second item in a stack. When items are indended to be independent of each other they can be placed at the same level in a stack.

In some programming languages there are implied stacks, such as the order of functions in a file or the order of files in a project.

## Scale

The approach of defining stacks can be applied at all scales of software and across boundaries, from individual files, functions or classes, to multiple, large codebases in different languages, frameworks and runtimes.

## Stages

![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/docs/stages-and-transitions.svg?sanitize=true)

## YAML

So Euince has composability, e.g. multiple sources of dependency and structure, a common data format is described using YAML.

``` YAML
- id: item in upper level of stack
  dependsUpon: first item in lower level of stack
  items:
  - id: nested item
    dependsUpon: second item in lower level of stack
-
  - first item in lower level of stack
  - second item in lower level of stack
```

## Analyzers

Analyzers are implemented to create the YAML files (e.g. from source code in a specific language, or using a specific framework).

An analyzer exists for JavaScript with support for many of the language's features.

JavaScript Analyzer [![NPM](https://img.shields.io/npm/v/@devsnicket/eunice-javascript-analyzer.svg)](https://www.npmjs.com/package/@devsnicket/eunice-javascript-analyzer
) [![Git](https://raw.githubusercontent.com/DevSnicket/Eunice/master/docs/git.svg?sanitize=true) ![GitHub](https://raw.githubusercontent.com/DevSnicket/Eunice/master/docs/github.svg?sanitize=true)](https://github.com/DevSnicket/eunice-javascript-analyzer) [![Build Status](https://travis-ci.org/DevSnicket/Eunice.svg?branch=master)](https://travis-ci.org/DevSnicket/eunice-javascript-analyzer) [![Coverage Status](https://coveralls.io/repos/github/DevSnicket/Eunice/badge.svg?branch=master&c=1)](https://coveralls.io/github/DevSnicket/eunice-javascript-analyzer?branch=master)

## Processors

YAML files generated by analyzers can then be optionally post-processed which includes combining the output of different analyzers. Currently there are processors written in JavaScript to:
- create or add to stacks
	- [applied uniformly](Processors/createOrAddToStacks/uniformly.js)
	- [to items with an identifier](Processors/createOrAddToStacks/toItemsWithIdentifier)*
	- [using the file system (.devsnicket-eunice-stack.yaml)](Processors/createOrAddToStacks/usingFileSystem)*
- [concatenate multiple sources of analysis from the file system](Processors/concatenateFromFileSystem)*
- [group items by their identifier](Processors/groupItemsByIdentifierSeparator)
- order items by
	- [identifier](Processors/orderItemsBy/identifier)
	- index of
		- [identifier suffix](Processors/orderItemsBy/indexOf/identifierSuffix)
		- [type](Processors/orderItemsBy/indexOf/type)
- [remove redundant prefix of parent identifier and separator](Processors/removeRedundantParentIdentifierPrefix)
- [remove self dependent items of a type](Processors/removeSelfDependentItemsOfType)
- [replace identifiers using a regular expression](Processors/replaceIdentifiers)
- [sets the type of root items](Processors/setTypeOfRootItems)
- [unstack independent items](Processors/unstackIndependent)

(\* not available in test harnesses)

Processors can be run from the command line and ([example](dogfooding/generate.sh)) from test harnesses through a [plug-in discovery](https://github.com/DevSnicket/plugin-discovery) system.

## Renderer

To visualise and explorer what's in the YAML files, and to statistically measure how well they match the intended structure, a SVG renderer has been implemented. The renderer doesn't use lines between items to show dependencies and instead marks items with counts for each dependency type:

- matches stack (green down arrow)
- does not match stack (red up arrow) 
- is not independent (red horizontal arrow).

[![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgElementForYaml/createArrows/testcase.svg?sanitize=true)](Renderer/getSvgElementForYaml/createArrows/testcase.svg)

Dependency counts appear for both sides of the dependency, the dependent item and the item depended upon. When there are multiple counts a summary of all counts is rendered at the bottom. <sup>[1]</sup>.

scenario | svg | scenario | svg | scenario | svg
-------- | :-: | -------- | :-: | -------- | :-:
upper depends<br/>upon lower | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgForYaml/testcases/stack/upper-depends-upon-lower/.svg?sanitize=true)](Renderer/getSvgForYaml/testcases/stack/upper-depends-upon-lower/.svg) | lower depends<br/>upon upper | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgForYaml/testcases/stack/lower-depends-upon-upper/.svg?sanitize=true)](Renderer/getSvgForYaml/testcases/stack/lower-depends-upon-upper/.svg) | interdependent<br/>(stacked) | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgForYaml/testcases/stack/two-interdependent/.svg?sanitize=true)](Renderer/getSvgForYaml/testcases/stack/two-interdependent/.svg)
independent | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgForYaml/testcases/two/.svg?sanitize=true)](Renderer/getSvgForYaml/testcases/two/.svg) | first depends<br/>upon second | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgForYaml/testcases/independency/first-depends-upon-second/.svg?sanitize=true)](Renderer/getSvgForYaml/testcases/independency/first-depends-upon-second/.svg) | interdependent<br/>(not stacked)<sup>[1]</sup> | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgForYaml/testcases/independency/two-interdependent/.svg?sanitize=true)](Renderer/getSvgForYaml/testcases/independency/two-interdependent/.svg)

Dependencies within an item are also summarised and rendered inside the item box, below the identifer text.

scenario | svg | scenario | svg | scenario | svg
-------- | :-: | -------- | :-: | -------- | :-:
parent depends<br />upon item | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgForYaml/testcases/parent-depends-upon-item/.svg?sanitize=true)](Renderer/getSvgForYaml/testcases/parent-depends-upon-item/.svg) | item depends<br />upon parent | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgForYaml/testcases/item-depends-upon-parent/.svg?sanitize=true)](Renderer/getSvgForYaml/testcases/item-depends-upon-parent/.svg) | first item<br/> depends upon<br/>second item<br/>(not stacked) | [![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgForYaml/testcases/independency/first-item-depends-upon-second-item/.svg?sanitize=true)](Renderer/getSvgForYaml/testcases/independency/first-item-depends-upon-second-item/.svg)

Items and sub-item can also be opened by clicking/tapping on their box. Opening an item will show its contents and breadcrumb links for where it is in the hierarchy.

root > grandparent

[![](https://raw.githubusercontent.com/DevSnicket/Eunice/master/Renderer/getSvgForYaml/withSubset.testcases/upper-item-depends-upon-lower-item-with-parent.svg?sanitize=true)](Renderer/getSvgForYaml/withSubset.testcases/upper-item-depends-upon-lower-item-with-parent.svg) 

>[try out JavaScript &rightarrow; YAML &rightarrow; SVG](https://devsnicket.github.io/Eunice-harnesses/harness.html)

## Supporting DevSnicket packages

The following DevSnicket NPM packages support the JavaScript analyzer, processors and renderer.

* Eunice specific
  * Call when process entry point [![NPM](https://img.shields.io/npm/v/@devsnicket/eunice-call-when-process-entry-point.svg)](https://www.npmjs.com/package/@devsnicket/eunice-call-when-process-entry-point
) [![Git](https://raw.githubusercontent.com/DevSnicket/Eunice/master/docs/git.svg?sanitize=true) ![GitHub](https://raw.githubusercontent.com/DevSnicket/Eunice/master/docs/github.svg?sanitize=true)](https://github.com/DevSnicket/eunice-call-when-process-entry-point) [![Build Status](https://travis-ci.org/DevSnicket/Eunice.svg?branch=master)](https://travis-ci.org/DevSnicket/eunice-call-when-process-entry-point)
  * Dependency and structure [![NPM](https://img.shields.io/npm/v/@devsnicket/eunice-dependency-and-structure.svg)](https://www.npmjs.com/package/@devsnicket/eunice-dependency-and-structure
) [![Git](https://raw.githubusercontent.com/DevSnicket/Eunice/master/docs/git.svg?sanitize=true) ![GitHub](https://raw.githubusercontent.com/DevSnicket/Eunice/master/docs/github.svg?sanitize=true)](https://github.com/DevSnicket/eunice-dependency-and-structure) [![Build Status](https://travis-ci.org/DevSnicket/Eunice.svg?branch=master)](https://travis-ci.org/DevSnicket/eunice-dependency-and-structure) [![Coverage Status](https://coveralls.io/repos/github/DevSnicket/Eunice/badge.svg?branch=master&c=1)](https://coveralls.io/github/DevSnicket/eunice-dependency-and-structure?branch=master)
  * Run tests from file system [![NPM](https://img.shields.io/npm/v/@devsnicket/eunice-run-tests-from-file-system.svg)](https://www.npmjs.com/package/@devsnicket/eunice-run-tests-from-file-system
) [![Git](https://raw.githubusercontent.com/DevSnicket/Eunice/master/docs/git.svg?sanitize=true) ![GitHub](https://raw.githubusercontent.com/DevSnicket/Eunice/master/docs/github.svg?sanitize=true)](https://github.com/DevSnicket/eunice-run-tests-from-file-system) [![Build Status](https://travis-ci.org/DevSnicket/Eunice.svg?branch=master)](https://travis-ci.org/DevSnicket/eunice-run-tests-from-file-system)
  * Test harnesses [![NPM](https://img.shields.io/npm/v/@devsnicket/eunice-test-harnesses.svg)](https://www.npmjs.com/package/@devsnicket/eunice-test-harnesses
) [![Git](https://raw.githubusercontent.com/DevSnicket/Eunice/master/docs/git.svg?sanitize=true) ![GitHub](https://raw.githubusercontent.com/DevSnicket/Eunice/master/docs/github.svg?sanitize=true)](https://github.com/DevSnicket/eunice-test-harnesses) [![Build Status](https://travis-ci.org/DevSnicket/Eunice.svg?branch=master)](https://travis-ci.org/DevSnicket/eunice-test-harnesses)
* Plug-in Discovery [![Git](https://raw.githubusercontent.com/DevSnicket/Eunice/master/docs/git.svg?sanitize=true) ![GitHub](https://raw.githubusercontent.com/DevSnicket/Eunice/master/docs/github.svg?sanitize=true)](https://github.com/DevSnicket/eunice-plugin-discovery)
  * Create repository factory function [![NPM](https://img.shields.io/npm/v/@devsnicket/plugin-discovery-create-repository.svg)](https://www.npmjs.com/package/@devsnicket/plugin-discovery-create-repository)
  * CommonJS Babel plug-in [![NPM](https://img.shields.io/npm/v/@devsnicket/plugin-discovery-commonjs-babel-plugin.svg)](https://www.npmjs.com/package/@devsnicket/plugin-discovery-commonjs-babel-plugin)