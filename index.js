import * as utilities from "./utilities";

/**
 * @module eblock
 */

/**
 * Generate a randmon ID
 * @static
 * @function
 * @returns {String} The new ID
 */
export const generateID = utilities.generateID;

/**
 * Check if the condition is true, otherwise throw an error
 * @param {*} _cond The condition
 * @param {*} _error The error or the genenrator of the error
 * @param  {...any} _args The arguments passed to the generator of the error
 * @returns {*} The condition
 * @private
 */
function assert(_cond, _error, ..._args) {
    if (_cond) {
        return _cond;
    } else {
        throw typeof _error === "function" ? _error.apply(undefined, _args): _error;
    }
}

const DomEventHandler = Symbol("EBlockContainer.DomEventHandler");
const DomEventDispatcher = Symbol("EBlockContainer.DomEventProc");

/**
 * Class of the container for the eblock instances
 */
export class EBlockContainer {

    /**
     * The symbole of the member as the dispatcher of the event
     */
    static DomEventDispatcher = DomEventDispatcher;
    
    /**
     * Create the instance of the EBlockContainer
     * @constructor
     */
    constructor () {
        Object.defineProperty(this, DomEventHandler, {
            value: this[DomEventDispatcher].bind(this),
            writable: false
        });
    }

    /**
     * Define a node in this container
     * @abstract
     * @param {Node} _node The node to be defined
     */
    define(_node) {
        throw new Error("No implementation");
    }

    /**
     * Remove some defined nodes from this container
     * @abstract
     * @param {String} _selector The selector for querying the destination nodes
     */
    undefine(_selector) {
        throw new Error("No implementation");
    }

    /**
     * The node in this container to contain the eblock instance
     * @type {Node}
     * @abstract
     */
    get stageContainer() {
        throw new Error("No implementation");
    }

    /**
     * The node in this container to receive the event
     * @type {Node}
     * @abstarct
     */
    get eventContainer() {
        throw new Error("No implementation");
    }
    
    /**
     * Enable processing the special event in the container
     * @param {String} _eventName The name of the event, such as "keydown", "mousedown", and so on.
     * @returns {EBlockContainer} This container
     */
    enableDomEvent(_eventName) {
        this.eventContainer.addEventListener(_eventName, this[DomEventHandler]);
        return this;
    }

    /**
     * Disbale processing the sepcial event in the container
     * @param {String} _eventName The name of the event, such as "keydown", "mousedown", and so on.
     * @returns {EBlockContainer} This container
     */
    disableDomEvent(_eventName) {
        this.eventContainer.removeEventListener(_eventName, this[DomEventHandler]);
        return this;
    }

    /**
     * Add an event listener in the container
     * @param  {...any} _args The arguments as the same as for Event.addEventListener
     * @returns {EBlockContainer} This container
     */
    addEventListener(..._args) {
        this.eventContainer.addEventListener(..._args);
        return this;
    }

    /**
     * Remove an event listener in the container
     * @param  {...any} _args The arguments as the same as fro Event.removeEventListener
     * @returns {EBlockContainer} This container
     */
    removeEventListener(..._args) {
        this.eventContainer.addEventListener(..._args);
        return this;
    }

    /**
     * The dispatcher of the event
     * @abstract
     * @param {Event} _event The event should be dispatch
     */
    [DomEventDispatcher](_event) { 
        throw new Error("No implementation");
    }
}

/**
 * Class of the factor for generating the instance of the eblock
 * @property {String} id The ID of the factor
 * @property {Node} source The global template node of the fatcor
 * @property {NodeList} predefineds The list of node containing the predefined node
 * @property {Object} scripts The object containing the export functions and data
 * @property {Node} templateNode The node of the template
 */
export class EBlockFactor {

    /**
     * Map for the registry of the factor in each container
     * @static
     * @type {WeakMap}
     */
    static RegistryMap = new WeakMap();

    /**
     * Get the registry of the special container
     * @static
     * @param {EBlockContainer} _container The special container
     * @returns {WeakSet} The registry of the special container
     */
    static AcquireRegistry(_container) {
        assert(_container instanceof EBlockContainer, Error, "The _container must be an instance of EBlockContainer");

        let registry = EBlockFactor.RegistryMap.get(_container);
        if (!(registry instanceof WeakSet)) {
            registry = new WeakSet();
            EBlockFactor.RegistryMap.set(_container, registry);
        }

        return registry;
    }

    /**
     * Peek all predefined node from the global template
     * @static
     * @param {Node} _node The node of the global template
     * @param {*} _stamp The stamp will add to the predefined nodes
     * @returns {NodeList} The list of node containing the predefined nodes
     */
    static peekPredefineds(_node, _stamp) {
        const predefineds = [..._node.querySelectorAll("[eblock-predefined]")];
        _stamp || (_stamp = "");
        predefineds.forEach(item => item.setAttribute("eblock-predefined", _stamp));
        return predefineds;
    }

    /**
     * Peek scripts block from the global temple
     * @static
     * @param {Node} _node The node of the global template
     * @returns {Object} The object containing export functions and data
     */
    static peekScripts(_node) {
        let scripts = {};
        [..._node.querySelectorAll("[eblock-script]")].forEach(scriptNode => {
            let fnFactor = new Function("declarer", `${scriptNode.textContent};return declarer;`);
            try {
                scripts = fnFactor(scripts);
            } catch (err) {
                console.error("Exception raised when generating the script", scriptNode, err);
            }
        });

        return scripts;
    }

    /**
     * Peek the template node form the global template
     * @static
     * @param {Node} _node The node of the global template
     * @returns {Node} The template node
     */
    static peekTemplateNode(_node) {
        let template = _node.querySelector("[eblock-template]");
        return template;
    }

    /**
     * Create an instance of the EBlockFactor
     * @constructor
     * @param {Node} _node The node of the global template
     */
    constructor (_node) {
        assert(_node && (typeof _node.querySelectorAll === "function"), Error, "The _node must be an instance can invoke querySelector");

        const id = generateID();

        Object.defineProperties(this, {
            id: { writable: false, value: id },
            source: { writable: false, value: _node },
            predefineds: { writable: false, value: EBlockFactor.peekPredefineds(_node, id) },
            scripts: { writable: false, value: EBlockFactor.peekScripts(_node) },
            templateNode: { writable: false, value: EBlockFactor.peekTemplateNode(_node) }
        });
    }

    /**
     * Register this factor into a special container
     * @param {EBlockContainer} _container The target container
     * @returns {EBlockFactor} This factor
     */
    register(_container) {
        const registry = EBlockFactor.AcquireRegistry(_container);

        if (!registry.has(this)) {
            this.predefineds.forEach(item => _container.define(item.cloneNode(true)));

            (typeof this.onFactorRegister === "function") && this.onFactorRegister(_container);
            this.callScript("onFactorRegister", this, _container);

            registry.add(this);
        }

        return this;
    }

    /**
     * Unregister this factor into a special container
     * @param {EBlockContainer} _container The target container
     * @returns {EBlockFactor} This factor
     */
    unregister(_container) {
        const registry = EBlockFactor.AcquireRegistry(_container);

        if (registry.has(this)) {
            (typeof this.onFactorUnregister === "function") && this.onFactorUnregister(_container);
            this.callScript("onFactorUnregister", this, _container);

            _container.undefine(`[eblock-predefined="${this.id}"]`);

            registry.delete(this);
        }

        return this;
    }

    /**
     * Generate an instance of EBlock base on this factor
     * @param {Node} _containerNode The node to contain the new instance of EBlock
     * @param {Class} _blockClass The class derived from EBlock
     * @param {Any} _data The data bind to the new instance of EBlock
     * @param  {...any} _opts The external arguments passed to the constructor of the _blockClass
     * @returns {EBlock} The new instance of EBlock
     */
    generate(_containerNode, _blockClass, _data, ..._opts) {
        assert((typeof _blockClass === "function") && (_blockClass.prototype instanceof EBlock), Error, "The _blockClass must be inherited from EBlock");
        assert(_containerNode instanceof Node, Error, "The _containerNode must be an instance of Node");

        let eblock = new _blockClass(this, _data, ..._opts);
        _containerNode && eblock.mount(_containerNode);

        return eblock;
    }

    /**
     * Clone the template node
     * @returns {Node} The new node
     */
    generateFromTemplate() {
        return this.templateNode && this.templateNode.cloneNode(true);
    }

    /**
     * Query the special nodes from the template
     * @param {String} _selector The selector to match the special nodes
     * @returns {NodeList} The list of the special nodes
     */
    queryNodeFromTemplate(_selector) {
        return this.templateNode && _selector && this.templateNode.querySelector(_selector);
    }

    /**
     * Call a special function declared in this factor
     * @param {String|Symbol} _name The name of the special function
     * @param {Object} _this The "this" value binding to the special function
     * @param  {...any} _args The arguments passed to the special function
     * @returns {Any} The result from the special function
     */
    callScript(_name, _this, ..._args) {
        return this.applyScript(_name, _this, _args);
    }

    /**
     * Call a special function declared in this factor
     * @param {String|Symbol} _name The name of the special function
     * @param {Object} _this The "this" value binding to the special function
     * @param  {Array} _args The arguments passed to the special function
     * @returns {Any} The result from the special function
     */
    applyScript(_name, _this, _args) {
        const fn = this.scripts[_name];
        return (typeof fn === "function") && fn.apply(_this, _args);
    }
}

const BLOCK_ID = Symbol("eblock.block.id");
const CONSTRUCTOR_REF = Symbol("eblock.constructor.ref");
const FACTOR_REF = Symbol("eblock.factor.ref");
const DATA_REF = Symbol("eblock.data.ref");

const MetadataMap = new WeakMap();

function eblockGetMappedData() {
    return this.source[this.key];
}

function eblockSetMappedData(_val) {
    this.source[this.key] = _val;
}

/**
 * Class of the EBlock
 * @property {Node} $assignedNode The node assigned with this instance of EBlock
 * @property {Any} data The data binded to this instance of EBlock
 * @property {EBlockFactor} factor The factor
 * @property {String} blockID The ID of the block
 * @property {Boolean} $stubFlag The flag to indicate if the instance is a stub.
 */
export class EBlock {

    /**
     * Get the instance of EBlock assigned with the special node
     * @static
     * @param {Node} _node The special node
     * @returns {EBlock} The instance of EBlock assigned with the special node
     */
    static GetInstance(_node) {
        if (_node instanceof Node) {
            try {
                let metadata = MetadataMap.get(_node);
                return metadata && (new metadata[CONSTRUCTOR_REF](_node, undefined));
            } catch {
                return null;
            }
        }
    }

    /**
     * Check if two instance of EBlock is assigned with the same node
     * @param {EBlock} _block1 The first node
     * @param {EBlock} _block2 The second node
     * @returns {Boolean} return true if the two instance is assigned with the same node
     */
    static equal(_block1, _block2) {
        if (_block1 instanceof EBlock) {
            return _block1.equal(_block2);
        } else {
            return _block1 === undefined && _block2 === undefined;
        }
    }

    /**
     * Create or query an instance of EBlock
     * @constructor
     * @param {Node|EBlockFactor} _factorOrNode The factor or the node had been assigned with an instance of EBlock
     * @param {Any} _data The data binding to the instance. This argument is ignored if the _factorOrNode isn't a fatcor.
     * @param  {...any} _args The arguments passed to initialize the metadate of the instance. This arguments is ignored if the _factorOrNode isn't a fatcor.
     */
    constructor (_factorOrNode, _data, ..._args) {
        let isCreate = false;
        let metadata;
        let targetNode;
        if (_factorOrNode instanceof Node) {
            targetNode = _factorOrNode;
            metadata = MetadataMap.get(targetNode);
            assert(metadata, Error, "The node is not assigned with the avaliable metadata");
            assert(metadata[CONSTRUCTOR_REF] === this.constructor, Error, "The node is not matched the special class derived from EBlock");
        } else {
            assert(_factorOrNode instanceof EBlockFactor, Error, "_factorOrNode must be an instance of EBlockFactor or Node");
            targetNode = _factorOrNode.generateFromTemplate();
            assert(targetNode instanceof Node, Error, "Cannot clone the node from the template");
            metadata = { 
                [BLOCK_ID]: generateID(),
                [CONSTRUCTOR_REF]: this.constructor, 
                [FACTOR_REF]: _factorOrNode,
                [DATA_REF]: _data,
                queuePromise: null 
            };
            _factorOrNode.callScript("onInitMetadata", _factorOrNode, metadata, _data, targetNode, ..._args );
            this.initMetadata(metadata, _data, targetNode, ..._args);
            MetadataMap.set(targetNode, metadata);
            isCreate = true;
        }

        const metaDataDescs = Object.getOwnPropertyDescriptors(metadata);
        const mapDataDescs = { 
            $assignedNode: {
                value: targetNode,
                writable: false,
                configurable: false,
                enumerable: true
            },
            data: { 
                value: metadata[DATA_REF],
                writable: false,
                configurable: false,
                enumerable: true
            },
            factor: {
                value: metadata[FACTOR_REF],
                writable: false,
                configurable: false,
                enumerable: true
            },
            blockID: {
                value: metadata[BLOCK_ID],
                writable: false,
                configurable: false,
                enumerable: true
            },
            $stubFlag: {
                value: !isCreate,
                writable: false,
                configurable: false,
                enumerable: true
            }
        };
        for (let key in metaDataDescs) {
            if (typeof key !== "symbol") {
                let desc = metaDataDescs[key];
                if (desc.get || desc.set) {
                    mapDataDescs["$" + key] = desc;
                } else {
                    let bindSource = { source:metadata, key };
                    mapDataDescs["$" + key] = {
                        get: eblockGetMappedData.bind(bindSource),
                        set: desc.writable ? eblockSetMappedData.bind(bindSource) : undefined,
                        configurable: false,
                        enumerable: desc.enumerable
                    };
                }
            }
        }
        for (let key of Object.getOwnPropertySymbols(metadata)) {
            if (!(key in mapDataDescs)) {
                let bindSource = { source:metadata, key };
                mapDataDescs[key] = {
                    get: eblockGetMappedData.bind(bindSource),
                    set: eblockSetMappedData.bind(bindSource),
                    configurable: false,
                    enumerable: false
                };
            }
        }

        Object.defineProperties(this, mapDataDescs);

        isCreate && this.queueAction(() => this.fireEvent("ebevent-create", _data));
    }

    /**
     * Initialize the metadata of the instance
     * @abstract
     * @param {Object} _metadata The container of the metadata
     * @param {Any} _data The data binded to this instance
     * @param {Node} _node The node assigned with this instance
     * @param  {...any} _args The external arguments
     */
    initMetadata(_metadata, _data, _node, ..._args) {
        
    }

    /**
     * Acquire a special node.
     * An new node will be created if it isn't contained in the instance.
     * @param {String} _selector The selector to match the node
     * @param {Node} _refNode The reference node for locating the special node
     * @param {String} _refPosition The relative position of the special node
     * @returns {Node} The special node
     */
    acquireNode(_selector, _refNode, _refPosition) {
        if (_selector) {
            let node = this.$assignedNode.querySelector(_selector);
            if (!node && _refNode) {
                node = this.factor.queryNodeFromTemplate(_selector);
                node && (node = node.cloneNode(true));
                node && _refNode.insertAdjacentElement(_refPosition || "afterend", node);
            } else if (_refNode) {
                _refNode.insertAdjacentElement(_refPosition || "afterend", node);
            }
            return node;
        }
    }

    /**
     * Compare this instance to an other one
     * @param {EBlock} _eblock The other instance
     * @returns {Boolean} return true if the other one is assigned with the same node of this instance
     */
    equal(_eblock) {
        return (_eblock instanceof EBlock) && (this.$assignedNode === _eblock.$assignedNode);
    }

    /**
     * Start an action in the processing queue of this instance
     * @param {Function} _fn The action
     * @returns {EBlock} This instance
     */
    queueAction(_fn) {
        if (typeof _fn === "function") {
            if (this.$queuePromise instanceof Promise) {
                this.$queuePromise = this.$queuePromise.then(() => {
                    try { 
                        return _fn();
                    } catch(err) {
                        console.warn(`Exception raised in processing action in queue[#${this.blockID}]`, err);
                    }
                });
            } else {
                this.$queuePromise = Promise.resolve(undefined).then(() => {
                    try { 
                        return _fn();
                    } catch(err) {
                        console.warn(`Exception raised in processing action in queue[#${this.blockID}]`, err);
                    }
                });
            }
        }
        return this;
    }

    /**
     * Dispath an event to this instance and its decendante nodes
     * @param {String} _event The name of the event
     * @param  {...any} _args The detail parameters of the event
     * @returns {EBlock} This instance
     */
    fireEvent(_event, ..._args) {
        try {
            const factor = this.factor;
            [...this.$assignedNode.querySelectorAll(`${this.eventSelectorPrefix || ""}[${_event}]`)].reverse().forEach(subItem => {
                let fnName = subItem.getAttribute(_event);
                fnName && factor.applyScript(fnName, this, [..._args, subItem]);
            });

            let fnName = this.$assignedNode.getAttribute(_event);
            fnName && factor.applyScript(fnName, this, [..._args, this.$assignedNode]);

            let localFn = this[`on-${_event}`];
            (typeof localFn === "function") && localFn.apply(this, _args);
        } catch (err) {
            console.warn(`Exception raised in fireEvent(${_event})[#${this.blockID}]`, err);
        }

        return this;
    }

    /**
     * Mount this instance to a parent node
     * @param {Node} _containerNode The parent node
     * @returns {EBlock} This instance
     */
    mount(_containerNode) {
        if (_containerNode instanceof Node) {
            this.fireEvent("ebevent-mounting", this.data);
            _containerNode.appendChild(this.$assignedNode);
            this.fireEvent("ebevent-mounted", this.data);
        } else {
            console.warn("The _containerNode must be an instance of Node");
        }
        
        return this;
    }

    /**
     * Unmount this instance
     * @returns {EBlock} This instance
     */
    unmount() {
        this.fireEvent("ebevent-unmounting", this.data);
        this.$assignedNode.remove();
        return this.fireEvent("ebevent-unmounted", this.data);
    }

    /**
     * Render this instance
     * @param  {...any} _args The arguments passed as the external parameters to the rendering event
     * @returns {EBlock} This instance
     */
    render(..._args) {
        let context = {};
        return this.fireEvent("ebevent-prepare-render", this.data, context, ..._args)
                   .fireEvent("ebevent-rendering", this.data, context, ..._args)
                   .fireEvent("ebevent-rendered", this.data, context, ..._args);
    }
}