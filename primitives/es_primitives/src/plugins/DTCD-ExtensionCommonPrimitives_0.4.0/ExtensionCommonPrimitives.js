const img$1 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='iso-8859-1'%3f%3e%3c!-- Generator: Adobe Illustrator 19.0.0%2c SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3e%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512.001 512.001' style='enable-background:new 0 0 512.001 512.001%3b' xml:space='preserve'%3e%3cg%3e %3cg%3e %3cpath d='M506.143%2c5.859c-7.811-7.811-20.475-7.811-28.285%2c0l-472%2c472c-7.811%2c7.811-7.811%2c20.474%2c0%2c28.284 c3.905%2c3.906%2c9.024%2c5.858%2c14.142%2c5.858s10.237-1.953%2c14.143-5.858l472-472C513.954%2c26.333%2c513.954%2c13.67%2c506.143%2c5.859z'/%3e %3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e";

class ObjectModelPrimitive$1 {
  static getPrimitiveInfo() {
    return {
      title: 'Связь',
      name: 'SimpleEdge',
      groups: ['Связи'],
      icon: img$1,
    };
  }

  constructor(yFiles) {
    this.yfiles = yFiles.default;
  }

  create() {
    const instance = new this.yfiles.SimpleEdge();
    instance.style = new this.yfiles.PolylineEdgeStyle();
    return instance;
  }
}

const img = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' width='48px' height='48px'%3e%3cpath fill='%23FFA000' d='M40%2c12H22l-4-4H8c-2.2%2c0-4%2c1.8-4%2c4v8h40v-4C44%2c13.8%2c42.2%2c12%2c40%2c12z'/%3e%3cpath fill='%23FFCA28' d='M40%2c12H8c-2.2%2c0-4%2c1.8-4%2c4v20c0%2c2.2%2c1.8%2c4%2c4%2c4h32c2.2%2c0%2c4-1.8%2c4-4V16C44%2c13.8%2c42.2%2c12%2c40%2c12z'/%3e%3c/svg%3e";

class ObjectModelPrimitive {
  static getPrimitiveInfo() {
    return {
      icon: img,
      name: 'Group',
      title: 'Группа',
      groups: ['Группировки'],
    };
  }

  constructor(yFiles) {
    this.yfiles = yFiles.default;
  }

  create() {
    const { SimpleNode, Rect, GroupNodeStyle } = this.yfiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 300, 300);

    instance.style = new GroupNodeStyle({
      tabFill: '#f0c808',
      contentAreaInsets: 20,
    });

    instance.tag = {
      type: 'group',
      properties: {},
    };

    return instance;
  }
}

// import SimpleNode from './SimpleNode';
// import MathOperationNode from './MathOperationNode';
// import InPort from './InPort';
// import OutPort from './OutPort';

var primitives = [ObjectModelPrimitive$1, ObjectModelPrimitive];

class CustomError extends Error {
  constructor (msg) {
    super(msg);
    this.name = this.constructor.name;
  }
}

class AbstractMethodImplementError extends CustomError {
  constructor (methodName, className) {
    super(
      `The "${methodName}" method must be implemented in the ${className} class`
    );
  }
}

/**
 * @typedef {Object} PluginMeta
 * @property {String} title
 * @property {String} name
 * @property {String[]} actions
 * @property {String[]} events
 * @property {String[]} requirements
 */
class AbstractPlugin {
  /**
   * Static method of AbstractPlugin class which need to reload!
   * @static
   * @returns {PluginMeta}
   * @return {String} meta.title
   * @return {String} meta.name
   * @return {String[]} meta.actions
   * @return {String[]} meta.events
   * @return {String[]} meta.dependencies
   */
  static getRegistrationMeta() {
    throw new AbstractMethodImplementError('Implement the getRegistrationMeta static method!');
  }

  /**
   * Installing system
   * @method
   * @param {String} name
   * @param {String} version
   * @param {String} guid
   * @return {Object} Returns instance of plugin
   */
  installSystem({ name, version, guid }) {
    return Application.installSystem({ name, version, guid });
  }

  /**
   * Installing panel
   * @method
   * @param {String} name
   * @param {String} version
   * @param {String} guid
   * @param {String} selector
   * @return {Object} Returns instance of plugin
   */
  installPanel({ name, version, guid, selector }) {
    return Application.installPanel({ name, version, guid, selector });
  }

  /**
   * Install extension by target and name
   * @method
   * @param {String} target
   * @param {String} pluginName
   * @return {Object} Returns instance of plugin
   */
  installExtension(target, pluginName, ...args) {
    return Application.installExtension(target, pluginName, ...args);
  }

  /**
   * Uninstall plugin from Application by instance
   * @method
   * @param {Object} instance
   * @returns {Boolean}
   */
  uninstallPluginByInstance(instance) {
    return Application.uninstallPluginByInstance(instance);
  }

  /**
   * Uninstall plugin from Application by unique identifier (GUID)
   * @method
   * @param {String} guid Unique identifier of the instance to be uninstalled
   * @returns {Boolean}
   */
  uninstallPluginByGUID(guid) {
    return Application.uninstallPluginByGUID(guid);
  }

  /**
   * Getting module from dependencies
   * @method
   * @param {String} name
   * @param {String} type
   * @param {String} version
   * @returns {Object[]}
   */
  getDependence(name, type, version) {
    return Application.getDependence(name, type, version);
  }

  getPlugin(name, version) {
    return Application.getPlugin(name, version);
  }

  /**
   * Getting all extensions for plugin by name
   * @method
   * @param {String} name
   * @return {Object[]}
   */
  getExtensions(name) {
    return Application.getExtensions(name);
  }

  /**
   * Getting list of all awailable panels
   * @method
   * @return {Object[]}
   */
  getPanels() {
    return Application.getPanels();
  }

  /**
   * Getting system by name
   * @method
   * @param {String} name
   * @return {Object}
   */
  getSystem(name, version) {
    return Application.getSystem(name, version);
  }
  /**
   * Getting instance by GUID
   * @method
   * @param {String} guid
   * @returns {Object}
   */
  getInstance(guid) {
    return Application.getInstance(guid);
  }

  findInstances(name, version) {
    return Application.findInstances(name, version);
  }

  /**
   * Getting GUID by instance of plugin
   * @method
   * @param {Object} instance
   * @returns {Object}
   */
  getGUID(instance) {
    return Application.getGUID(instance);
  }

  /**
   * Getting list of all GUID's
   * @method
   * @returns {String[]}
   */
  getGUIDList() {
    return Application.getGUIDList();
  }

  /**
   * Resets systems if they has resetSystem method
   * @method
   */
  resetSystems() {
    return Application.resetSystems();
  }
}

/**
 * @typedef {Object} ExtensionInfo
 * @property {String} plugin
 * @property {*} data
 */
class ExtensionPlugin extends AbstractPlugin {
  /**
   * @static
   * @return {ExtensionInfo} information about extension
   */
  static getExtensionInfo() {
    throw new AbstractMethodImplementError('Implement the getExtensionInfo static method!');
  }
}

var version = "0.4.0";

class ExtensionCommonPrimitives extends ExtensionPlugin {
  static getRegistrationMeta() {
    return {
      version,
      type: 'extension',
      target: ['PrimitiveLibraryPanel', 'LiveDashPanel'],
      title: 'Расширение библиотеки примитивов Common',
      name: 'ExtensionCommonPrimitives',
    };
  }

  static getExtensionInfo() {
    const result = [];
    primitives.forEach(primitive => {
      const primitiveInfo = primitive.getPrimitiveInfo();
      primitiveInfo.extensionName = this.getRegistrationMeta().name;
      primitiveInfo.primitiveName = primitiveInfo.name;
      result.push(primitiveInfo);
    });
    return result;
  }

  constructor() {
    super();

    const yFiles = this.getDependence('yFiles');

    this.primitives = {};
    primitives.forEach(PrimitiveClass => {
      const { name } = PrimitiveClass.getPrimitiveInfo();
      this.primitives[name] = PrimitiveClass.bind(null, yFiles);
    });
  }
}

export { ExtensionCommonPrimitives };
