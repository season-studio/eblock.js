<a name="module_eblock"></a>

## eblock

* [eblock](#module_eblock)
    * [.EBlockContainer](#module_eblock.EBlockContainer)
        * [new exports.EBlockContainer()](#new_module_eblock.EBlockContainer_new)
        * [.DomEventDispatcher](#module_eblock.EBlockContainer+DomEventDispatcher)
        * *[.stageContainer](#module_eblock.EBlockContainer+stageContainer) : <code>Node</code>*
        * [.eventContainer](#module_eblock.EBlockContainer+eventContainer) : <code>Node</code>
        * *[.define(_node)](#module_eblock.EBlockContainer+define)*
        * *[.undefine(_selector)](#module_eblock.EBlockContainer+undefine)*
        * [.enableDomEvent(_eventName)](#module_eblock.EBlockContainer+enableDomEvent) ⇒ <code>EBlockContainer</code>
        * [.disableDomEvent(_eventName)](#module_eblock.EBlockContainer+disableDomEvent) ⇒ <code>EBlockContainer</code>
        * [.addEventListener(..._args)](#module_eblock.EBlockContainer+addEventListener) ⇒ <code>EBlockContainer</code>
        * [.removeEventListener(..._args)](#module_eblock.EBlockContainer+removeEventListener) ⇒ <code>EBlockContainer</code>
        * *[.DomEventDispatcher(_event)](#module_eblock.EBlockContainer+DomEventDispatcher)*
    * [.EBlockFactor](#module_eblock.EBlockFactor)
        * [new exports.EBlockFactor(_node)](#new_module_eblock.EBlockFactor_new)
        * _instance_
            * [.RegistryMap](#module_eblock.EBlockFactor+RegistryMap) : <code>WeakMap</code>
            * [.register(_container)](#module_eblock.EBlockFactor+register) ⇒ <code>EBlockFactor</code>
            * [.unregister(_container)](#module_eblock.EBlockFactor+unregister) ⇒ <code>EBlockFactor</code>
            * [.generate(_containerNode, _blockClass, _data, ..._opts)](#module_eblock.EBlockFactor+generate) ⇒ <code>EBlock</code>
            * [.generateFromTemplate()](#module_eblock.EBlockFactor+generateFromTemplate) ⇒ <code>Node</code>
            * [.queryNodeFromTemplate(_selector)](#module_eblock.EBlockFactor+queryNodeFromTemplate) ⇒ <code>NodeList</code>
            * [.callScript(_name, _this, ..._args)](#module_eblock.EBlockFactor+callScript) ⇒ <code>Any</code>
            * [.applyScript(_name, _this, _args)](#module_eblock.EBlockFactor+applyScript) ⇒ <code>Any</code>
        * _static_
            * [.AcquireRegistry(_container)](#module_eblock.EBlockFactor.AcquireRegistry) ⇒ <code>WeakSet</code>
            * [.peekPredefineds(_node, _stamp)](#module_eblock.EBlockFactor.peekPredefineds) ⇒ <code>NodeList</code>
            * [.peekScripts(_node)](#module_eblock.EBlockFactor.peekScripts) ⇒ <code>Object</code>
            * [.peekTemplateNode(_node)](#module_eblock.EBlockFactor.peekTemplateNode) ⇒ <code>Node</code>
    * [.EBlock](#module_eblock.EBlock)
        * [new exports.EBlock(_factorOrNode, _data, ..._args)](#new_module_eblock.EBlock_new)
        * _instance_
            * *[.initMetadata(_metadata, _data, _node, ..._args)](#module_eblock.EBlock+initMetadata)*
            * [.acquireNode(_selector, _refNode, _refPosition)](#module_eblock.EBlock+acquireNode) ⇒ <code>Node</code>
            * [.equal(_eblock)](#module_eblock.EBlock+equal) ⇒ <code>Boolean</code>
            * [.queueAction(_fn)](#module_eblock.EBlock+queueAction) ⇒ <code>EBlock</code>
            * [.fireEvent(_event, ..._args)](#module_eblock.EBlock+fireEvent) ⇒ <code>EBlock</code>
            * [.mount(_containerNode)](#module_eblock.EBlock+mount) ⇒ <code>EBlock</code>
            * [.unmount()](#module_eblock.EBlock+unmount) ⇒ <code>EBlock</code>
            * [.render(..._args)](#module_eblock.EBlock+render) ⇒ <code>EBlock</code>
        * _static_
            * [.GetInstance(_node)](#module_eblock.EBlock.GetInstance) ⇒ <code>EBlock</code>
            * [.equal(_block1, _block2)](#module_eblock.EBlock.equal) ⇒ <code>Boolean</code>
    * [.generateID()](#module_eblock.generateID) ⇒ <code>String</code>

<a name="module_eblock.EBlockContainer"></a>

### eblock.EBlockContainer
Class of the container for the eblock instances

**Kind**: static class of [<code>eblock</code>](#module_eblock)  

* [.EBlockContainer](#module_eblock.EBlockContainer)
    * [new exports.EBlockContainer()](#new_module_eblock.EBlockContainer_new)
    * [.DomEventDispatcher](#module_eblock.EBlockContainer+DomEventDispatcher)
    * *[.stageContainer](#module_eblock.EBlockContainer+stageContainer) : <code>Node</code>*
    * [.eventContainer](#module_eblock.EBlockContainer+eventContainer) : <code>Node</code>
    * *[.define(_node)](#module_eblock.EBlockContainer+define)*
    * *[.undefine(_selector)](#module_eblock.EBlockContainer+undefine)*
    * [.enableDomEvent(_eventName)](#module_eblock.EBlockContainer+enableDomEvent) ⇒ <code>EBlockContainer</code>
    * [.disableDomEvent(_eventName)](#module_eblock.EBlockContainer+disableDomEvent) ⇒ <code>EBlockContainer</code>
    * [.addEventListener(..._args)](#module_eblock.EBlockContainer+addEventListener) ⇒ <code>EBlockContainer</code>
    * [.removeEventListener(..._args)](#module_eblock.EBlockContainer+removeEventListener) ⇒ <code>EBlockContainer</code>
    * *[.DomEventDispatcher(_event)](#module_eblock.EBlockContainer+DomEventDispatcher)*

<a name="new_module_eblock.EBlockContainer_new"></a>

#### new exports.EBlockContainer()
Create the instance of the EBlockContainer

<a name="module_eblock.EBlockContainer+DomEventDispatcher"></a>

#### eBlockContainer.DomEventDispatcher
The symbole of the member as the dispatcher of the event

**Kind**: instance property of [<code>EBlockContainer</code>](#module_eblock.EBlockContainer)  
<a name="module_eblock.EBlockContainer+stageContainer"></a>

#### *eBlockContainer.stageContainer : <code>Node</code>*
The node in this container to contain the eblock instance

**Kind**: instance abstract property of [<code>EBlockContainer</code>](#module_eblock.EBlockContainer)  
<a name="module_eblock.EBlockContainer+eventContainer"></a>

#### eBlockContainer.eventContainer : <code>Node</code>
The node in this container to receive the event

**Kind**: instance property of [<code>EBlockContainer</code>](#module_eblock.EBlockContainer)  
**Abstarct**:   
<a name="module_eblock.EBlockContainer+define"></a>

#### *eBlockContainer.define(_node)*
Define a node in this container

**Kind**: instance abstract method of [<code>EBlockContainer</code>](#module_eblock.EBlockContainer)  

| Param | Type | Description |
| --- | --- | --- |
| _node | <code>Node</code> | The node to be defined |

<a name="module_eblock.EBlockContainer+undefine"></a>

#### *eBlockContainer.undefine(_selector)*
Remove some defined nodes from this container

**Kind**: instance abstract method of [<code>EBlockContainer</code>](#module_eblock.EBlockContainer)  

| Param | Type | Description |
| --- | --- | --- |
| _selector | <code>String</code> | The selector for querying the destination nodes |

<a name="module_eblock.EBlockContainer+enableDomEvent"></a>

#### eBlockContainer.enableDomEvent(_eventName) ⇒ <code>EBlockContainer</code>
Enable processing the special event in the container

**Kind**: instance method of [<code>EBlockContainer</code>](#module_eblock.EBlockContainer)  
**Returns**: <code>EBlockContainer</code> - This container  

| Param | Type | Description |
| --- | --- | --- |
| _eventName | <code>String</code> | The name of the event, such as "keydown", "mousedown", and so on. |

<a name="module_eblock.EBlockContainer+disableDomEvent"></a>

#### eBlockContainer.disableDomEvent(_eventName) ⇒ <code>EBlockContainer</code>
Disbale processing the sepcial event in the container

**Kind**: instance method of [<code>EBlockContainer</code>](#module_eblock.EBlockContainer)  
**Returns**: <code>EBlockContainer</code> - This container  

| Param | Type | Description |
| --- | --- | --- |
| _eventName | <code>String</code> | The name of the event, such as "keydown", "mousedown", and so on. |

<a name="module_eblock.EBlockContainer+addEventListener"></a>

#### eBlockContainer.addEventListener(..._args) ⇒ <code>EBlockContainer</code>
Add an event listener in the container

**Kind**: instance method of [<code>EBlockContainer</code>](#module_eblock.EBlockContainer)  
**Returns**: <code>EBlockContainer</code> - This container  

| Param | Type | Description |
| --- | --- | --- |
| ..._args | <code>any</code> | The arguments as the same as for Event.addEventListener |

<a name="module_eblock.EBlockContainer+removeEventListener"></a>

#### eBlockContainer.removeEventListener(..._args) ⇒ <code>EBlockContainer</code>
Remove an event listener in the container

**Kind**: instance method of [<code>EBlockContainer</code>](#module_eblock.EBlockContainer)  
**Returns**: <code>EBlockContainer</code> - This container  

| Param | Type | Description |
| --- | --- | --- |
| ..._args | <code>any</code> | The arguments as the same as fro Event.removeEventListener |

<a name="module_eblock.EBlockContainer+DomEventDispatcher"></a>

#### *eBlockContainer.DomEventDispatcher(_event)*
The dispatcher of the event

**Kind**: instance abstract method of [<code>EBlockContainer</code>](#module_eblock.EBlockContainer)  

| Param | Type | Description |
| --- | --- | --- |
| _event | <code>Event</code> | The event should be dispatch |

<a name="module_eblock.EBlockFactor"></a>

### eblock.EBlockFactor
Class of the factor for generating the instance of the eblock

**Kind**: static class of [<code>eblock</code>](#module_eblock)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The ID of the factor |
| source | <code>Node</code> | The global template node of the fatcor |
| predefineds | <code>NodeList</code> | The list of node containing the predefined node |
| scripts | <code>Object</code> | The object containing the export functions and data |
| templateNode | <code>Node</code> | The node of the template |


* [.EBlockFactor](#module_eblock.EBlockFactor)
    * [new exports.EBlockFactor(_node)](#new_module_eblock.EBlockFactor_new)
    * _instance_
        * [.RegistryMap](#module_eblock.EBlockFactor+RegistryMap) : <code>WeakMap</code>
        * [.register(_container)](#module_eblock.EBlockFactor+register) ⇒ <code>EBlockFactor</code>
        * [.unregister(_container)](#module_eblock.EBlockFactor+unregister) ⇒ <code>EBlockFactor</code>
        * [.generate(_containerNode, _blockClass, _data, ..._opts)](#module_eblock.EBlockFactor+generate) ⇒ <code>EBlock</code>
        * [.generateFromTemplate()](#module_eblock.EBlockFactor+generateFromTemplate) ⇒ <code>Node</code>
        * [.queryNodeFromTemplate(_selector)](#module_eblock.EBlockFactor+queryNodeFromTemplate) ⇒ <code>NodeList</code>
        * [.callScript(_name, _this, ..._args)](#module_eblock.EBlockFactor+callScript) ⇒ <code>Any</code>
        * [.applyScript(_name, _this, _args)](#module_eblock.EBlockFactor+applyScript) ⇒ <code>Any</code>
    * _static_
        * [.AcquireRegistry(_container)](#module_eblock.EBlockFactor.AcquireRegistry) ⇒ <code>WeakSet</code>
        * [.peekPredefineds(_node, _stamp)](#module_eblock.EBlockFactor.peekPredefineds) ⇒ <code>NodeList</code>
        * [.peekScripts(_node)](#module_eblock.EBlockFactor.peekScripts) ⇒ <code>Object</code>
        * [.peekTemplateNode(_node)](#module_eblock.EBlockFactor.peekTemplateNode) ⇒ <code>Node</code>

<a name="new_module_eblock.EBlockFactor_new"></a>

#### new exports.EBlockFactor(_node)
Create an instance of the EBlockFactor


| Param | Type | Description |
| --- | --- | --- |
| _node | <code>Node</code> | The node of the global template |

<a name="module_eblock.EBlockFactor+RegistryMap"></a>

#### eBlockFactor.RegistryMap : <code>WeakMap</code>
Map for the registry of the factor in each container

**Kind**: instance property of [<code>EBlockFactor</code>](#module_eblock.EBlockFactor)  
<a name="module_eblock.EBlockFactor+register"></a>

#### eBlockFactor.register(_container) ⇒ <code>EBlockFactor</code>
Register this factor into a special container

**Kind**: instance method of [<code>EBlockFactor</code>](#module_eblock.EBlockFactor)  
**Returns**: <code>EBlockFactor</code> - This factor  

| Param | Type | Description |
| --- | --- | --- |
| _container | <code>EBlockContainer</code> | The target container |

<a name="module_eblock.EBlockFactor+unregister"></a>

#### eBlockFactor.unregister(_container) ⇒ <code>EBlockFactor</code>
Unregister this factor into a special container

**Kind**: instance method of [<code>EBlockFactor</code>](#module_eblock.EBlockFactor)  
**Returns**: <code>EBlockFactor</code> - This factor  

| Param | Type | Description |
| --- | --- | --- |
| _container | <code>EBlockContainer</code> | The target container |

<a name="module_eblock.EBlockFactor+generate"></a>

#### eBlockFactor.generate(_containerNode, _blockClass, _data, ..._opts) ⇒ <code>EBlock</code>
Generate an instance of EBlock base on this factor

**Kind**: instance method of [<code>EBlockFactor</code>](#module_eblock.EBlockFactor)  
**Returns**: <code>EBlock</code> - The new instance of EBlock  

| Param | Type | Description |
| --- | --- | --- |
| _containerNode | <code>Node</code> | The node to contain the new instance of EBlock |
| _blockClass | <code>Class</code> | The class derived from EBlock |
| _data | <code>Any</code> | The data bind to the new instance of EBlock |
| ..._opts | <code>any</code> | The external arguments passed to the constructor of the _blockClass |

<a name="module_eblock.EBlockFactor+generateFromTemplate"></a>

#### eBlockFactor.generateFromTemplate() ⇒ <code>Node</code>
Clone the template node

**Kind**: instance method of [<code>EBlockFactor</code>](#module_eblock.EBlockFactor)  
**Returns**: <code>Node</code> - The new node  
<a name="module_eblock.EBlockFactor+queryNodeFromTemplate"></a>

#### eBlockFactor.queryNodeFromTemplate(_selector) ⇒ <code>NodeList</code>
Query the special nodes from the template

**Kind**: instance method of [<code>EBlockFactor</code>](#module_eblock.EBlockFactor)  
**Returns**: <code>NodeList</code> - The list of the special nodes  

| Param | Type | Description |
| --- | --- | --- |
| _selector | <code>String</code> | The selector to match the special nodes |

<a name="module_eblock.EBlockFactor+callScript"></a>

#### eBlockFactor.callScript(_name, _this, ..._args) ⇒ <code>Any</code>
Call a special function declared in this factor

**Kind**: instance method of [<code>EBlockFactor</code>](#module_eblock.EBlockFactor)  
**Returns**: <code>Any</code> - The result from the special function  

| Param | Type | Description |
| --- | --- | --- |
| _name | <code>String</code> \| <code>Symbol</code> | The name of the special function |
| _this | <code>Object</code> | The "this" value binding to the special function |
| ..._args | <code>any</code> | The arguments passed to the special function |

<a name="module_eblock.EBlockFactor+applyScript"></a>

#### eBlockFactor.applyScript(_name, _this, _args) ⇒ <code>Any</code>
Call a special function declared in this factor

**Kind**: instance method of [<code>EBlockFactor</code>](#module_eblock.EBlockFactor)  
**Returns**: <code>Any</code> - The result from the special function  

| Param | Type | Description |
| --- | --- | --- |
| _name | <code>String</code> \| <code>Symbol</code> | The name of the special function |
| _this | <code>Object</code> | The "this" value binding to the special function |
| _args | <code>Array</code> | The arguments passed to the special function |

<a name="module_eblock.EBlockFactor.AcquireRegistry"></a>

#### EBlockFactor.AcquireRegistry(_container) ⇒ <code>WeakSet</code>
Get the registry of the special container

**Kind**: static method of [<code>EBlockFactor</code>](#module_eblock.EBlockFactor)  
**Returns**: <code>WeakSet</code> - The registry of the special container  

| Param | Type | Description |
| --- | --- | --- |
| _container | <code>EBlockContainer</code> | The special container |

<a name="module_eblock.EBlockFactor.peekPredefineds"></a>

#### EBlockFactor.peekPredefineds(_node, _stamp) ⇒ <code>NodeList</code>
Peek all predefined node from the global template

**Kind**: static method of [<code>EBlockFactor</code>](#module_eblock.EBlockFactor)  
**Returns**: <code>NodeList</code> - The list of node containing the predefined nodes  

| Param | Type | Description |
| --- | --- | --- |
| _node | <code>Node</code> | The node of the global template |
| _stamp | <code>\*</code> | The stamp will add to the predefined nodes |

<a name="module_eblock.EBlockFactor.peekScripts"></a>

#### EBlockFactor.peekScripts(_node) ⇒ <code>Object</code>
Peek scripts block from the global temple

**Kind**: static method of [<code>EBlockFactor</code>](#module_eblock.EBlockFactor)  
**Returns**: <code>Object</code> - The object containing export functions and data  

| Param | Type | Description |
| --- | --- | --- |
| _node | <code>Node</code> | The node of the global template |

<a name="module_eblock.EBlockFactor.peekTemplateNode"></a>

#### EBlockFactor.peekTemplateNode(_node) ⇒ <code>Node</code>
Peek the template node form the global template

**Kind**: static method of [<code>EBlockFactor</code>](#module_eblock.EBlockFactor)  
**Returns**: <code>Node</code> - The template node  

| Param | Type | Description |
| --- | --- | --- |
| _node | <code>Node</code> | The node of the global template |

<a name="module_eblock.EBlock"></a>

### eblock.EBlock
Class of the EBlock

**Kind**: static class of [<code>eblock</code>](#module_eblock)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| $assignedNode | <code>Node</code> | The node assigned with this instance of EBlock |
| data | <code>Any</code> | The data binded to this instance of EBlock |
| factor | <code>EBlockFactor</code> | The factor |
| blockID | <code>String</code> | The ID of the block |
| $stubFlag | <code>Boolean</code> | The flag to indicate if the instance is a stub. |


* [.EBlock](#module_eblock.EBlock)
    * [new exports.EBlock(_factorOrNode, _data, ..._args)](#new_module_eblock.EBlock_new)
    * _instance_
        * *[.initMetadata(_metadata, _data, _node, ..._args)](#module_eblock.EBlock+initMetadata)*
        * [.acquireNode(_selector, _refNode, _refPosition)](#module_eblock.EBlock+acquireNode) ⇒ <code>Node</code>
        * [.equal(_eblock)](#module_eblock.EBlock+equal) ⇒ <code>Boolean</code>
        * [.queueAction(_fn)](#module_eblock.EBlock+queueAction) ⇒ <code>EBlock</code>
        * [.fireEvent(_event, ..._args)](#module_eblock.EBlock+fireEvent) ⇒ <code>EBlock</code>
        * [.mount(_containerNode)](#module_eblock.EBlock+mount) ⇒ <code>EBlock</code>
        * [.unmount()](#module_eblock.EBlock+unmount) ⇒ <code>EBlock</code>
        * [.render(..._args)](#module_eblock.EBlock+render) ⇒ <code>EBlock</code>
    * _static_
        * [.GetInstance(_node)](#module_eblock.EBlock.GetInstance) ⇒ <code>EBlock</code>
        * [.equal(_block1, _block2)](#module_eblock.EBlock.equal) ⇒ <code>Boolean</code>

<a name="new_module_eblock.EBlock_new"></a>

#### new exports.EBlock(_factorOrNode, _data, ..._args)
Create or query an instance of EBlock


| Param | Type | Description |
| --- | --- | --- |
| _factorOrNode | <code>Node</code> \| <code>EBlockFactor</code> | The factor or the node had been assigned with an instance of EBlock |
| _data | <code>Any</code> | The data binding to the instance. This argument is ignored if the _factorOrNode isn't a fatcor. |
| ..._args | <code>any</code> | The arguments passed to initialize the metadate of the instance. This arguments is ignored if the _factorOrNode isn't a fatcor. |

<a name="module_eblock.EBlock+initMetadata"></a>

#### *eBlock.initMetadata(_metadata, _data, _node, ..._args)*
Initialize the metadata of the instance

**Kind**: instance abstract method of [<code>EBlock</code>](#module_eblock.EBlock)  

| Param | Type | Description |
| --- | --- | --- |
| _metadata | <code>Object</code> | The container of the metadata |
| _data | <code>Any</code> | The data binded to this instance |
| _node | <code>Node</code> | The node assigned with this instance |
| ..._args | <code>any</code> | The external arguments |

<a name="module_eblock.EBlock+acquireNode"></a>

#### eBlock.acquireNode(_selector, _refNode, _refPosition) ⇒ <code>Node</code>
Acquire a special node.An new node will be created if it isn't contained in the instance.

**Kind**: instance method of [<code>EBlock</code>](#module_eblock.EBlock)  
**Returns**: <code>Node</code> - The special node  

| Param | Type | Description |
| --- | --- | --- |
| _selector | <code>String</code> | The selector to match the node |
| _refNode | <code>Node</code> | The reference node for locating the special node |
| _refPosition | <code>String</code> | The relative position of the special node |

<a name="module_eblock.EBlock+equal"></a>

#### eBlock.equal(_eblock) ⇒ <code>Boolean</code>
Compare this instance to an other one

**Kind**: instance method of [<code>EBlock</code>](#module_eblock.EBlock)  
**Returns**: <code>Boolean</code> - return true if the other one is assigned with the same node of this instance  

| Param | Type | Description |
| --- | --- | --- |
| _eblock | <code>EBlock</code> | The other instance |

<a name="module_eblock.EBlock+queueAction"></a>

#### eBlock.queueAction(_fn) ⇒ <code>EBlock</code>
Start an action in the processing queue of this instance

**Kind**: instance method of [<code>EBlock</code>](#module_eblock.EBlock)  
**Returns**: <code>EBlock</code> - This instance  

| Param | Type | Description |
| --- | --- | --- |
| _fn | <code>function</code> | The action |

<a name="module_eblock.EBlock+fireEvent"></a>

#### eBlock.fireEvent(_event, ..._args) ⇒ <code>EBlock</code>
Dispath an event to this instance and its decendante nodes

**Kind**: instance method of [<code>EBlock</code>](#module_eblock.EBlock)  
**Returns**: <code>EBlock</code> - This instance  

| Param | Type | Description |
| --- | --- | --- |
| _event | <code>String</code> | The name of the event |
| ..._args | <code>any</code> | The detail parameters of the event |

<a name="module_eblock.EBlock+mount"></a>

#### eBlock.mount(_containerNode) ⇒ <code>EBlock</code>
Mount this instance to a parent node

**Kind**: instance method of [<code>EBlock</code>](#module_eblock.EBlock)  
**Returns**: <code>EBlock</code> - This instance  

| Param | Type | Description |
| --- | --- | --- |
| _containerNode | <code>Node</code> | The parent node |

<a name="module_eblock.EBlock+unmount"></a>

#### eBlock.unmount() ⇒ <code>EBlock</code>
Unmount this instance

**Kind**: instance method of [<code>EBlock</code>](#module_eblock.EBlock)  
**Returns**: <code>EBlock</code> - This instance  
<a name="module_eblock.EBlock+render"></a>

#### eBlock.render(..._args) ⇒ <code>EBlock</code>
Render this instance

**Kind**: instance method of [<code>EBlock</code>](#module_eblock.EBlock)  
**Returns**: <code>EBlock</code> - This instance  

| Param | Type | Description |
| --- | --- | --- |
| ..._args | <code>any</code> | The arguments passed as the external parameters to the rendering event |

<a name="module_eblock.EBlock.GetInstance"></a>

#### EBlock.GetInstance(_node) ⇒ <code>EBlock</code>
Get the instance of EBlock assigned with the special node

**Kind**: static method of [<code>EBlock</code>](#module_eblock.EBlock)  
**Returns**: <code>EBlock</code> - The instance of EBlock assigned with the special node  

| Param | Type | Description |
| --- | --- | --- |
| _node | <code>Node</code> | The special node |

<a name="module_eblock.EBlock.equal"></a>

#### EBlock.equal(_block1, _block2) ⇒ <code>Boolean</code>
Check if two instance of EBlock is assigned with the same node

**Kind**: static method of [<code>EBlock</code>](#module_eblock.EBlock)  
**Returns**: <code>Boolean</code> - return true if the two instance is assigned with the same node  

| Param | Type | Description |
| --- | --- | --- |
| _block1 | <code>EBlock</code> | The first node |
| _block2 | <code>EBlock</code> | The second node |

<a name="module_eblock.generateID"></a>

### eblock.generateID() ⇒ <code>String</code>
Generate a randmon ID

**Kind**: static method of [<code>eblock</code>](#module_eblock)  
**Returns**: <code>String</code> - The new ID  
