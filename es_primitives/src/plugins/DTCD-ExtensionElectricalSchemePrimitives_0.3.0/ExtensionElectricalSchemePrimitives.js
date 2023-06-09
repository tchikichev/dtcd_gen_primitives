var version = "0.3.0";

var pluginMeta = {
  version,
  type: 'extension',
  name: 'ExtensionElectricalSchemePrimitives',
  title: 'Примитивы для электрических схем',
  target: ['PrimitiveLibraryPanel', 'LiveDashPanel'],
};

var voltages = [
  {
    val: '04',
    color: 'rgb(95, 95, 95)',
  },
  {
    val: '6',
    color: 'rgb(29, 84, 10)',
  },
  {
    val: '35',
    color: 'rgb(88, 71, 46)',
  },
  {
    val: '110',
    color: 'rgb(0, 153, 255)',
  },
  {
    val: '220',
    color: 'rgb(255, 210, 0)',
  },
  {
    val: '330',
    color: 'rgb(0, 170, 0)',
  },
  {
    val: '400',
    color: 'rgb(255, 100, 30)',
  },
  {

    val: '500',
    color: 'rgb(213, 0, 0)',
  },
  {
    val: '750',
    color: 'rgb(0, 0, 168)',
  },
  {
    val: '800',
    color: 'rgb(0, 0, 168)',
  },
  {
    val: '1150',
    color: 'rgb(205, 138, 255)',
  },
];

class ObjectModelPrimitive$M {
  #yFiles;
  #color;

  constructor(yFiles, color) {
    this.#yFiles = yFiles.default;
    this.#color = color;
  }

  create() {
    const { Rect, SimpleNode, ShapeNodeStyle, ShapeNodeShape } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 400, 15);
    instance.style = new ShapeNodeStyle({
      shape: ShapeNodeShape.RECTANGLE,
      fill: this.#color,
      stroke: '0px solid',
    });

    const initPorts = [];
    let prevOffset = 0;

    for (let index = 0; index < 15; index++) {
      const x = prevOffset + 0.0625;
      prevOffset = x;
      initPorts.push({
        primitiveName: `inPort${index + 1}`,
        type: ['IN', 'OUT'],
        portPosition: { x, y: 0.5 },
        properties: {
          status: {
            expression: ``,
            type: 'expression',
          },
        },
      });
    }

    instance.tag = { properties: {}, initPorts };

    return instance;
  }
}

const img$M = "data:image/svg+xml,%3csvg width='55' height='55' xmlns='http://www.w3.org/2000/svg'%3e %3cg%3e %3crect height='20' width='55' y='17.5' x='0' stroke-width='0' fill='COLOR'/%3e %3cellipse ry='5' rx='5' cy='27.5' cx='27.5' stroke-width='0' fill='white'/%3e %3cellipse ry='5' rx='5' cy='27.5' cx='10' stroke-width='0' fill='white'/%3e %3cellipse ry='5' rx='5' cy='27.5' cx='45' stroke-width='0' fill='white'/%3e %3c/g%3e%3c/svg%3e";

const groups$2 = ['Элементы электрических схем'];

var BusbarSections = voltages.map(({ val, color }) => {
  const name = `BusbarSection${val}kV`;
  const title = `Секция шин ${val} кВ`;
  const icon = img$M.replace('COLOR', color);

  const primitiveInfo = { name, title, icon, groups: groups$2 };

  const classBuilder = new Function('baseClass', 'info', `
    return class ${name} extends baseClass {
      static getPrimitiveInfo() {
        return info;
      }

      constructor(yFiles) {
        super(yFiles, '${color}');
      }
    }
  `);

  return classBuilder(ObjectModelPrimitive$M, primitiveInfo);
});

class ObjectModelPrimitive$L {
  #yFiles;
  #strokeColor;

  constructor(yFiles, strokeColor) {
    this.#yFiles = yFiles.default;
    this.#strokeColor = strokeColor;
  }

  create() {
    const { SimpleEdge, PolylineEdgeStyle } = this.#yFiles;

    const instance = new SimpleEdge();
    instance.style = new PolylineEdgeStyle({
      stroke: `1px ${this.#strokeColor}`,
    });

    return instance;
  }
}

const img$L = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg clip-path='url(%23cp)'%3e %3cline x1='0' y1='45.5' x2='91' y2='45.5' stroke='COLOR'/%3e %3c/g%3e %3cdefs%3e %3cclipPath id='cp'%3e %3crect width='91' height='91'/%3e %3c/clipPath%3e %3c/defs%3e%3c/svg%3e";

const groups$1 = ['Элементы электрических схем'];

var ACLineSegments = voltages.map(({ val, color }) => {
  const name = `ACLineSegment${val}kV`;
  const title = `Воздушная линия ${val} кВ`;
  const icon = img$L.replace('COLOR', color);

  const primitiveInfo = { name, title, icon, groups: groups$1 };

  const classBuilder = new Function('baseClass', 'info', `
    return class ${name} extends baseClass {
      static getPrimitiveInfo() {
        return info;
      }

      constructor(yFiles) {
        super(yFiles, '${color}');
      }
    }
  `);

  return classBuilder(ObjectModelPrimitive$L, primitiveInfo);
});

var getCustomEdgeArrow = (yFiles) => {
  const {
    BaseClass,
    IArrow,
    IVisualCreator,
    IBoundsProvider,
    Rect,
    Point,
    SvgVisual,
    GeneralPath,
  } = yFiles;

  class CustomEdgeArrow extends BaseClass(IArrow, IVisualCreator, IBoundsProvider) {
    #stroke = 'black';
    #arrowFigure = null;
    #anchor = Point.ORIGIN;
    #direction = Point.ORIGIN;

    constructor(stroke) {
      super();
      this.#stroke = stroke;
    }

    get arrowFigure() {
      return this.#arrowFigure;
    }

    set arrowFigure(value) {
      this.#arrowFigure = value;
    }

    get length() {
      return 0;
    }

    get cropLength() {
      return 0;
    }

    getVisualCreator(edge, atSource, anchor, direction) {
      this.#anchor = anchor;
      this.#direction = direction;
      return this;
    }

    getBounds(context) {
      return new Rect(this.#anchor.x - 8, this.#anchor.y - 8, 32, 32);
    }

    getBoundsProvider(edge, atSource, anchor, direction) {
      this.#anchor = anchor;
      this.#direction = direction;
      return this;
    }

    createVisual(context) {
      if (this.arrowFigure === null) {
        this.arrowFigure = new GeneralPath();
        this.arrowFigure.moveTo(new Point(10, 5));
        this.arrowFigure.lineTo(new Point(10, -5));
        this.arrowFigure.lineTo(new Point(23, 0));
        this.arrowFigure.close();
      }

      const path = this.arrowFigure.createSvgPath();
      const { x, y } = this.#direction;
      const { x: ax, y: ay } = this.#anchor;
      path.setAttribute('stroke', this.#stroke);
      path.setAttribute('fill', 'var(--background_main)');
      path.setAttribute('transform', `matrix(${-x} ${-y} ${y} ${-x} ${ax} ${ay})`);

      return new SvgVisual(path);
    }

    updateVisual(context, oldVisual) {
      return this.createVisual(context);
    }
  }

  return CustomEdgeArrow;
};

class ObjectModelPrimitive$K {
  #yFiles;
  #strokeColor;

  constructor(yFiles, strokeColor) {
    this.#yFiles = yFiles.default;
    this.#strokeColor = strokeColor;
    this.customArrow = getCustomEdgeArrow(this.#yFiles);
  }

  create() {
    const { SimpleEdge, PolylineEdgeStyle } = this.#yFiles;

    const instance = new SimpleEdge();
    const arrow = new this.customArrow(this.#strokeColor);

    instance.style = new PolylineEdgeStyle({
      sourceArrow: arrow,
      targetArrow: arrow,
      stroke: `1px ${this.#strokeColor}`,
    });

    return instance;
  }
}

const img$K = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg stroke='COLOR'%3e %3cline x1='22' y1='45.5' x2='69' y2='45.5'/%3e %3cpath d='M12.5 41.25L22.7 45.5L12.5 49.75L12.5 41.25Z'/%3e %3cpath d='M78.5 41.25L68.3 45.5L78.5 49.75L78.5 41.25Z'/%3e %3cline x1='13' y1='45.5' x2='-4.37114e-08' y2='45.5'/%3e %3cline x1='91' y1='45.5' x2='78' y2='45.5'/%3e %3c/g%3e%3c/svg%3e";

const groups = ['Элементы электрических схем'];

var ACLineSegmentsCable = voltages.map(({ val, color }) => {
  const name = `ACLineSegmentCable${val}kV`;
  const title = `Кабельная линия ${val} кВ`;
  const icon = img$K.replace('COLOR', color);

  const primitiveInfo = { name, title, icon, groups };

  const classBuilder = new Function('baseClass', 'info', `
    return class ${name} extends baseClass {
      static getPrimitiveInfo() {
        return info;
      }

      constructor(yFiles) {
        super(yFiles, '${color}');
      }
    }
  `);

  return classBuilder(ObjectModelPrimitive$K, primitiveInfo);
});

const img$J = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M57 34H34V57H57V34ZM33 33V58H58V33H33Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 4.37113e-08L46 33H45L45 0L46 4.37113e-08Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 39L46 52H45L45 39H46Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 91L45 58H46L46 91H45Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$J {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$J,
      name: 'BreakerOn',
      title: 'Выключатель (включен)',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$J);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$I = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M57 34H34V57H57V34ZM33 33V58H58V33H33Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 4.37114e-08L46 33H45L45 0L46 4.37114e-08Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M52 46H39V45H52V46Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 91L45 58H46L46 91H45Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$I {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$I,
      name: 'BreakerOff',
      title: 'Выключатель (выключен)',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$I);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

var Breakers = [ObjectModelPrimitive$J, ObjectModelPrimitive$I];

const img$H = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 47C57.9264 47 68 36.9264 68 24.5C68 12.0736 57.9264 2 45.5 2C33.0736 2 23 12.0736 23 24.5C23 36.9264 33.0736 47 45.5 47ZM45.5 49C59.031 49 70 38.031 70 24.5C70 10.969 59.031 0 45.5 0C31.969 0 21 10.969 21 24.5C21 38.031 31.969 49 45.5 49Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 89C57.9264 89 68 78.9264 68 66.5C68 54.0736 57.9264 44 45.5 44C33.0736 44 23 54.0736 23 66.5C23 78.9264 33.0736 89 45.5 89ZM45.5 91C59.031 91 70 80.031 70 66.5C70 52.969 59.031 42 45.5 42C31.969 42 21 52.969 21 66.5C21 80.031 31.969 91 45.5 91Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 56L35 74H56L45.5 56ZM45.5 57.9846L36.741 73H54.259L45.5 57.9846Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46.6805 23.7942L53.3158 18.3876L52.6842 17.6124L45.5 23.4661L38.3158 17.6124L37.6842 18.3876L45 24.3487V33H46V24.6978L52.3438 25.7159L52.5023 24.7285L46.6805 23.7942Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$H {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$H,
      name: 'PowerTransformerTwoWinding',
      title: 'Трансформатор силовой 2-х обмоточный',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$H);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$G = "data:image/svg+xml,%3csvg width='84' height='81' viewBox='0 0 84 81' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M59.5 79C71.9264 79 82 68.9264 82 56.5C82 44.0736 71.9264 34 59.5 34C47.0736 34 37 44.0736 37 56.5C37 68.9264 47.0736 79 59.5 79ZM59.5 81C73.031 81 84 70.031 84 56.5C84 42.969 73.031 32 59.5 32C45.969 32 35 42.969 35 56.5C35 70.031 45.969 81 59.5 81Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M24.5 79C36.9264 79 47 68.9264 47 56.5C47 44.0736 36.9264 34 24.5 34C12.0736 34 2 44.0736 2 56.5C2 68.9264 12.0736 79 24.5 79ZM24.5 81C38.031 81 49 70.031 49 56.5C49 42.969 38.031 32 24.5 32C10.969 32 0 42.969 0 56.5C0 70.031 10.969 81 24.5 81Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M41.5 47C53.9264 47 64 36.9264 64 24.5C64 12.0736 53.9264 2 41.5 2C29.0736 2 19 12.0736 19 24.5C19 36.9264 29.0736 47 41.5 47ZM41.5 49C55.031 49 66 38.031 66 24.5C66 10.969 55.031 0 41.5 0C27.969 0 17 10.969 17 24.5C17 38.031 27.969 49 41.5 49Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.5 48L9 66H30L19.5 48ZM19.5 49.9846L10.741 65H28.259L19.5 49.9846Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M62.6805 56.7942L69.3158 51.3876L68.6842 50.6124L61.5 56.4661L54.3158 50.6124L53.6842 51.3876L61 57.3487V66H62V57.6978L68.3438 58.7159L68.5023 57.7285L62.6805 56.7942Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M42.6805 22.7942L49.3158 17.3876L48.6842 16.6124L41.5 22.4661L34.3158 16.6124L33.6842 17.3876L41 23.3487V32H42V23.6978L48.3438 24.7159L48.5023 23.7285L42.6805 22.7942Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$G {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$G,
      name: 'PowerTransformerThreeWinding',
      title: 'Трансформатор силовой 3-х обмоточный',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$G);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.3, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'inPort2',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.7, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$F = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 47C57.9264 47 68 36.9264 68 24.5C68 12.0736 57.9264 2 45.5 2C33.0735 2 23 12.0736 23 24.5C23 36.9264 33.0735 47 45.5 47ZM45.5 49C59.0309 49 70 38.031 70 24.5C70 10.969 59.0309 0 45.5 0C31.969 0 21 10.969 21 24.5C21 38.031 31.969 49 45.5 49Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 89C57.9264 89 68 78.9264 68 66.5C68 54.0736 57.9264 44 45.5 44C33.0735 44 23 54.0736 23 66.5C23 78.9264 33.0735 89 45.5 89ZM45.5 91C59.0309 91 70 80.031 70 66.5C70 52.969 59.0309 42 45.5 42C31.969 42 21 52.969 21 66.5C21 80.031 31.969 91 45.5 91Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 56L35 74H56L45.5 56ZM45.5 57.9846L36.741 73H54.2589L45.5 57.9846Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46.6805 23.7942L53.3158 18.3876L52.6841 17.6124L45.5 23.4661L38.3158 17.6124L37.6841 18.3876L45 24.3487V33H46V24.6978L52.3438 25.7159L52.5023 24.7285L46.6805 23.7942Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M74.2027 12.518L84.3234 8.68981L77.6882 16.7939L76.9145 16.1604L79.9658 12.4336L11.0737 61.862L10.4907 61.0495L79.3634 11.6351L74.5564 13.4533L74.2027 12.518Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$F {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$F,
      name: 'PowerTransformerTwoWindingLoadRegulation',
      title: 'Трансформатор силовой 2-х обмоточный с РПН',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$F);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$E = "data:image/svg+xml,%3csvg width='84' height='81' viewBox='0 0 84 81' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M59.5 79C71.9264 79 82 68.9264 82 56.5C82 44.0736 71.9264 34 59.5 34C47.0736 34 37 44.0736 37 56.5C37 68.9264 47.0736 79 59.5 79ZM59.5 81C73.031 81 84 70.031 84 56.5C84 42.969 73.031 32 59.5 32C45.969 32 35 42.969 35 56.5C35 70.031 45.969 81 59.5 81Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M24.5 79C36.9264 79 47 68.9264 47 56.5C47 44.0736 36.9264 34 24.5 34C12.0736 34 2 44.0736 2 56.5C2 68.9264 12.0736 79 24.5 79ZM24.5 81C38.031 81 49 70.031 49 56.5C49 42.969 38.031 32 24.5 32C10.969 32 0 42.969 0 56.5C0 70.031 10.969 81 24.5 81Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M41.5 47C53.9264 47 64 36.9264 64 24.5C64 12.0736 53.9264 2 41.5 2C29.0736 2 19 12.0736 19 24.5C19 36.9264 29.0736 47 41.5 47ZM41.5 49C55.031 49 66 38.031 66 24.5C66 10.969 55.031 0 41.5 0C27.969 0 17 10.969 17 24.5C17 38.031 27.969 49 41.5 49Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.5 48L9 66H30L19.5 48ZM19.5 49.9846L10.741 65H28.259L19.5 49.9846Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M62.6805 56.7942L69.3158 51.3876L68.6842 50.6124L61.5 56.4661L54.3158 50.6124L53.6842 51.3876L61 57.3487V66H62V57.6978L68.3438 58.7159L68.5023 57.7285L62.6805 56.7942Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M42.6805 20.7942L49.3158 15.3876L48.6842 14.6124L41.5 20.4661L34.3158 14.6124L33.6842 15.3876L41 21.3487V30H42V21.6978L48.3438 22.7159L48.5023 21.7285L42.6805 20.7942Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M63.8477 7.59371L77.2345 3.5163L77.6741 4.39909L66.8284 12.28L66.2405 11.471L72.4144 6.98484L1.21988 41.873L0.779838 40.9751L71.5595 6.29017L64.139 8.55032L63.8477 7.59371Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$E {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$E,
      name: 'PowerTransformerThreeWindingLoadRegulation',
      title: 'Трансформатор силовой 3-х обмоточный с РПН',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$E);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.3, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'inPort2',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.7, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

var PowerTransformers = [
  ObjectModelPrimitive$H,
  ObjectModelPrimitive$F,
  ObjectModelPrimitive$G,
  ObjectModelPrimitive$E,
];

const img$D = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 47C57.9264 47 68 36.9264 68 24.5C68 12.0736 57.9264 2 45.5 2C33.0736 2 23 12.0736 23 24.5C23 36.9264 33.0736 47 45.5 47ZM45.5 49C59.031 49 70 38.031 70 24.5C70 10.969 59.031 0 45.5 0C31.969 0 21 10.969 21 24.5C21 38.031 31.969 49 45.5 49Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 89C57.9264 89 68 78.9264 68 66.5C68 54.0736 57.9264 44 45.5 44C33.0736 44 23 54.0736 23 66.5C23 78.9264 33.0736 89 45.5 89ZM45.5 91C59.031 91 70 80.031 70 66.5C70 52.969 59.031 42 45.5 42C31.969 42 21 52.969 21 66.5C21 80.031 31.969 91 45.5 91Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$D {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$D,
      name: 'PotentialTransformerTwoWinding',
      title: 'Трансформатор напряжения 2-х обмоточный',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$D);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$C = "data:image/svg+xml,%3csvg width='84' height='81' viewBox='0 0 84 81' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M59.5 79C71.9264 79 82 68.9264 82 56.5C82 44.0736 71.9264 34 59.5 34C47.0736 34 37 44.0736 37 56.5C37 68.9264 47.0736 79 59.5 79ZM59.5 81C73.031 81 84 70.031 84 56.5C84 42.969 73.031 32 59.5 32C45.969 32 35 42.969 35 56.5C35 70.031 45.969 81 59.5 81Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M24.5 79C36.9264 79 47 68.9264 47 56.5C47 44.0736 36.9264 34 24.5 34C12.0736 34 2 44.0736 2 56.5C2 68.9264 12.0736 79 24.5 79ZM24.5 81C38.031 81 49 70.031 49 56.5C49 42.969 38.031 32 24.5 32C10.969 32 0 42.969 0 56.5C0 70.031 10.969 81 24.5 81Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M41.5 47C53.9264 47 64 36.9264 64 24.5C64 12.0736 53.9264 2 41.5 2C29.0736 2 19 12.0736 19 24.5C19 36.9264 29.0736 47 41.5 47ZM41.5 49C55.031 49 66 38.031 66 24.5C66 10.969 55.031 0 41.5 0C27.969 0 17 10.969 17 24.5C17 38.031 27.969 49 41.5 49Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$C {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$C,
      name: 'PotentialTransformerThreeWinding',
      title: 'Трансформатор напряжения 3-х обмоточный',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$C);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.3, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'inPort2',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.7, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

var PotentialTransformers = [ObjectModelPrimitive$D, ObjectModelPrimitive$C];

const img$B = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3ccircle cx='45.5' cy='45.5' r='15.5' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$B {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$B,
      name: 'ConnectivityNode',
      title: 'Отпайка',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ShapeNodeStyle, ShapeNodeShape } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 15, 15);

    instance.style = new ShapeNodeStyle({
      shape: ShapeNodeShape.ELLIPSE,
      fill: 'rgb(0, 0, 0)',
      stroke: '0px solid',
    });

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'inPort2',
          type: ['IN', 'OUT'],
          portPosition: { x: 1, y: 0.5 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'inPort3',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'inPort4',
          type: ['IN', 'OUT'],
          portPosition: { x: 0, y: 0.5 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$A = "data:image/svg+xml,%3csvg width='91' height='76' viewBox='0 0 91 76' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg clip-path='url(%23clip0_53_63)'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 74C57.9264 74 68 63.9264 68 51.5C68 39.0736 57.9264 29 45.5 29C33.0736 29 23 39.0736 23 51.5C23 63.9264 33.0736 74 45.5 74ZM45.5 76C59.031 76 70 65.031 70 51.5C70 37.969 59.031 27 45.5 27C31.969 27 21 37.969 21 51.5C21 65.031 31.969 76 45.5 76Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M50.405 53.5895C51.8203 54.474 53.259 55 54.5 55C56.294 55 57.9874 54.438 59.345 53.5895C60.7156 52.7329 61.67 51.6324 62.0715 50.6286L63.9285 51.3714C63.33 52.8676 62.0344 54.2671 60.405 55.2855C58.7626 56.312 56.706 57 54.5 57C52.741 57 50.9297 56.276 49.345 55.2855C47.7476 54.2872 46.2883 52.9611 45.2191 51.6247L46.7809 50.3753C47.7117 51.5389 49.0024 52.7128 50.405 53.5895Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.2191 51.6247C43.273 49.1921 40.5305 47 37.5 47C33.7616 47 30.7659 48.8647 29.9487 51.3162L28.0513 50.6838C29.2341 47.1353 33.2384 45 37.5 45C41.4695 45 44.727 47.8079 46.7809 50.3753L45.2191 51.6247Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 0L46 27H45L45 4.37112e-08L46 0Z' fill='black'/%3e %3c/g%3e %3cdefs%3e %3cclipPath id='clip0_53_63'%3e %3crect width='91' height='76' fill='white'/%3e %3c/clipPath%3e %3c/defs%3e%3c/svg%3e";

class ObjectModelPrimitive$A {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$A,
      name: 'Generator',
      title: 'Генератор',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$A);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$z = "data:image/svg+xml,%3csvg width='91' height='76' viewBox='0 0 91 76' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg clip-path='url(%23clip0_53_200)'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 74C57.9264 74 68 63.9264 68 51.5C68 39.0736 57.9264 29 45.5 29C33.0736 29 23 39.0736 23 51.5C23 63.9264 33.0736 74 45.5 74ZM45.5 76C59.031 76 70 65.031 70 51.5C70 37.969 59.031 27 45.5 27C31.969 27 21 37.969 21 51.5C21 65.031 31.969 76 45.5 76Z' fill='black'/%3e %3cpath d='M54 60H51.1299V45.8996L46.101 60H44.8745L39.8701 45.8996V60H37V41H41.0476L45.4877 53.5052L49.9524 41H54V60Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 0L46 27H45L45 4.37112e-08L46 0Z' fill='black'/%3e %3c/g%3e %3cdefs%3e %3cclipPath id='clip0_53_200'%3e %3crect width='91' height='76' fill='white'/%3e %3c/clipPath%3e %3c/defs%3e%3c/svg%3e";

class ObjectModelPrimitive$z {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$z,
      name: 'Engine',
      title: 'Двигатель',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$z);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$y = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M57 34H34V57H57V34ZM33 33V58H58V33H33Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 4.37114e-08L46 33H45L45 0L46 4.37114e-08Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 39L46 52H45L45 39H46Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 91L45 58H46L46 91H45Z' fill='black'/%3e %3cpath d='M63.08 40H59.71V33.33H62.99C63.5833 33.33 64.0467 33.4933 64.38 33.82C64.72 34.14 64.89 34.5433 64.89 35.03C64.89 35.43 64.7767 35.77 64.55 36.05C64.33 36.3233 64.0567 36.4933 63.73 36.56C64.09 36.6133 64.3933 36.8 64.64 37.12C64.8933 37.4333 65.02 37.7933 65.02 38.2C65.02 38.7333 64.8467 39.1667 64.5 39.5C64.16 39.8333 63.6867 40 63.08 40ZM62.75 36.09C63.0433 36.09 63.2733 36.01 63.44 35.85C63.6067 35.69 63.69 35.4833 63.69 35.23C63.69 34.97 63.6067 34.76 63.44 34.6C63.2733 34.44 63.0433 34.36 62.75 34.36H60.88V36.09H62.75ZM62.8 38.97C63.12 38.97 63.37 38.89 63.55 38.73C63.73 38.5633 63.82 38.3333 63.82 38.04C63.82 37.78 63.73 37.5633 63.55 37.39C63.37 37.21 63.12 37.12 62.8 37.12H60.88V38.97H62.8Z' fill='black'/%3e %3cpath d='M72.0044 40H70.8344V37.09H67.3644V40H66.1944V33.33H67.3644V36.06H70.8344V33.33H72.0044V40Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$y {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$y,
      name: 'LoadBreakSwitchOn',
      title: 'Выключатель нагрузки (включен)',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$y);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$x = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M57 34H34V57H57V34ZM33 33V58H58V33H33Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 4.37114e-08L46 33H45L45 0L46 4.37114e-08Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M52 46H39V45H52V46Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 91L45 58H46L46 91H45Z' fill='black'/%3e %3cpath d='M63.08 40H59.71V33.33H62.99C63.5833 33.33 64.0467 33.4933 64.38 33.82C64.72 34.14 64.89 34.5433 64.89 35.03C64.89 35.43 64.7767 35.77 64.55 36.05C64.33 36.3233 64.0567 36.4933 63.73 36.56C64.09 36.6133 64.3933 36.8 64.64 37.12C64.8933 37.4333 65.02 37.7933 65.02 38.2C65.02 38.7333 64.8467 39.1667 64.5 39.5C64.16 39.8333 63.6867 40 63.08 40ZM62.75 36.09C63.0433 36.09 63.2733 36.01 63.44 35.85C63.6067 35.69 63.69 35.4833 63.69 35.23C63.69 34.97 63.6067 34.76 63.44 34.6C63.2733 34.44 63.0433 34.36 62.75 34.36H60.88V36.09H62.75ZM62.8 38.97C63.12 38.97 63.37 38.89 63.55 38.73C63.73 38.5633 63.82 38.3333 63.82 38.04C63.82 37.78 63.73 37.5633 63.55 37.39C63.37 37.21 63.12 37.12 62.8 37.12H60.88V38.97H62.8Z' fill='black'/%3e %3cpath d='M72.0044 40H70.8344V37.09H67.3644V40H66.1944V33.33H67.3644V36.06H70.8344V33.33H72.0044V40Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$x {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$x,
      name: 'LoadBreakSwitchOff',
      title: 'Выключатель нагрузки (отключен)',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$x);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

var LoadBreakSwitches = [ObjectModelPrimitive$y, ObjectModelPrimitive$x];

const img$w = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg clip-path='url(%23clip0_53_260)'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 33L45 1.19249e-08L46 0L46 33H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 54L45 37H46L46 54H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 91L45 58H46L46 91H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M51 34H40L40 33H51V34Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M51 58H40L40 57H51V58Z' fill='black'/%3e %3c/g%3e %3cdefs%3e %3cclipPath id='clip0_53_260'%3e %3crect width='91' height='91' fill='white'/%3e %3c/clipPath%3e %3c/defs%3e%3c/svg%3e";

class ObjectModelPrimitive$w {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$w,
      name: 'DisconnectorOn',
      title: 'Разъединитель (включен)',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$w);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$v = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg clip-path='url(%23clip0_53_262)'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 33V1.19249e-08L46 0V33H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M37 45H54V46H37L37 45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 91L45 58H46L46 91H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M51 34H40V33H51V34Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M51 58H40V57H51V58Z' fill='black'/%3e %3c/g%3e %3cdefs%3e %3cclipPath id='clip0_53_262'%3e %3crect width='91' height='91' fill='white'/%3e %3c/clipPath%3e %3c/defs%3e%3c/svg%3e";

class ObjectModelPrimitive$v {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$v,
      name: 'DisconnectorOff',
      title: 'Разъединитель (отключен)',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$v);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

var Disconnectors = [ObjectModelPrimitive$w, ObjectModelPrimitive$v];

const img$u = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg clip-path='url(%23clip0_53_264)'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 33V1.19249e-08L46 0V33H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M37 80H54V81H37L37 80Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M44 90H47V91H44L44 90Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M41 85H50V86H41V85Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 80L45 58H46L46 80H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M51 34H40V33H51V34Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M51 58H40V57H51V58Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 54L45 37H46L46 54H45Z' fill='black'/%3e %3c/g%3e %3cdefs%3e %3cclipPath id='clip0_53_264'%3e %3crect width='91' height='91' fill='white'/%3e %3c/clipPath%3e %3c/defs%3e%3c/svg%3e";

class ObjectModelPrimitive$u {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$u,
      name: 'GroundSwitchOn',
      title: 'Заземляющий нож (включен)',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$u);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$t = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg clip-path='url(%23clip0_53_266)'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 33V1.19249e-08L46 0V33H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M37 80H54V81H37L37 80Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M44 90H47V91H44L44 90Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M41 85H50V86H41V85Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 80L45 58H46L46 80H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M51 34H40V33H51V34Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M51 58H40V57H51V58Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M37 45H54V46H37L37 45Z' fill='black'/%3e %3c/g%3e %3cdefs%3e %3cclipPath id='clip0_53_266'%3e %3crect width='91' height='91' fill='white'/%3e %3c/clipPath%3e %3c/defs%3e%3c/svg%3e";

class ObjectModelPrimitive$t {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$t,
      name: 'GroundSwitchOff',
      title: 'Заземляющий нож (отключен)',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$t);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

var GroundSwitches = [ObjectModelPrimitive$u, ObjectModelPrimitive$t];

const img$s = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 4.37113e-08L46 33H45L45 0L46 4.37113e-08Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 33H51V34H40V33Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 57H51V58H40V57Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 80L45 58H46L46 80H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M37 80H54V81H37V80Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M44 90H47V91H44V90Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M41 85H50V86H41V85Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M37 46H45V45H37V46Z' fill='black'/%3e %3cpath d='M29 45.5L40 49V42L29 45.5Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 54V37H45L45 54H46Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$s {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$s,
      name: 'ShortCircuiterOn',
      title: 'Короткозамыкатель (включен)',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$s);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$r = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 4.37114e-08L46 33H45L45 0L46 4.37114e-08Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 33H51V34H40V33Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 57H51V58H40V57Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 80L45 58H46L46 80H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 53.7279L62 36.7279L62.7071 37.435L45.7071 54.435L45 53.7279Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 46H54V45H46V46Z' fill='black'/%3e %3cpath d='M38 45.5L49 49V42L38 45.5Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M37 80H54V81H37L37 80Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M44 90H47V91H44L44 90Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M41 85H50V86H41V85Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$r {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$r,
      name: 'ShortCircuiterOff',
      title: 'Короткозамыкатель (отключен)',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$r);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

var ShortCircuiters = [ObjectModelPrimitive$s, ObjectModelPrimitive$r];

const img$q = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 4.37114e-08L46 33H45L45 0L46 4.37114e-08Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 33H51V34H40L40 33Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 57H51V58H40L40 57Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 91L45 58H46L46 91H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M54 46H46V45H54V46Z' fill='black'/%3e %3cpath d='M62 45.5L51 49L51 42L62 45.5Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 54L45 37H46L46 54H45Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$q {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$q,
      name: 'SeparatorOn',
      title: 'Отделитель (включен)',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$q);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$p = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 4.37114e-08L46 33H45L45 0L46 4.37114e-08Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 33H51V34H40L40 33Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 57H51V58H40L40 57Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 53.7279L62 36.7279L62.7071 37.435L45.7071 54.435L45 53.7279Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 91L45 58H46L46 91H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M62 46H54V45H62V46Z' fill='black'/%3e %3cpath d='M70 45.5L59 49V42L70 45.5Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$p {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$p,
      name: 'SeparatorOff',
      title: 'Отделитель (отключен)',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$p);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

var Separators = [ObjectModelPrimitive$q, ObjectModelPrimitive$p];

const img$o = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 4.37114e-08L46 33H45L45 0L46 4.37114e-08Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 33H51V34H40L40 33Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 57H51V58H40L40 57Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 54L45 37H46L46 54H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 91L45 58H46L46 91H45Z' fill='black'/%3e %3cpath d='M46 46V40H52V46H46Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$o {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$o,
      name: 'AutomaticBreakerOn',
      title: 'Автоматический выключатель (включен)',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$o);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$n = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 4.37114e-08L46 33H45L45 0L46 4.37114e-08Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 33H51V34H40V33Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 57H51V58H40V57Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M37 45H54V46H37L37 45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 91L45 58H46L46 91H45Z' fill='black'/%3e %3cpath d='M45 46H51V52H45V46Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$n {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$n,
      name: 'AutomaticBreakerOff',
      title: 'Автоматический выключатель (отключен)',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$n);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

var AutomaticBreakers = [ObjectModelPrimitive$o, ObjectModelPrimitive$n];

const img$m = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M57 34H34V57H57V34ZM33 33V58H58V33H33Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 21.5L46 33H45L45 21.5H46ZM46 4.37115e-08V15H45V0L46 4.37115e-08Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 69.5L46 58H45L45 69.5H46ZM46 91V76H45V91H46Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 39L46 52H45L45 39H46Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 14.2929L52.2175 21.0104L51.5104 21.7175L45.5 15.7071L39.4896 21.7175L38.7825 21.0104L45.5 14.2929Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 76.435L52.2175 69.7175L51.5104 69.0104L45.5 75.0208L39.4896 69.0104L38.7825 69.7175L45.5 76.435Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 20.2929L52.2175 27.0104L51.5104 27.7175L45.5 21.7071L39.4896 27.7175L38.7825 27.0104L45.5 20.2929Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 70.435L52.2175 63.7175L51.5104 63.0104L45.5 69.0208L39.4896 63.0104L38.7825 63.7175L45.5 70.435Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$m {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$m,
      name: 'BreakerCartWorkPositionBreakerOn',
      title: 'Тележка выключателя КРУ в рабочем положении, выключатель включен',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$m);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$l = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M57 34H34V57H57V34ZM33 33V58H58V33H33Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 21.5L46 33H45L45 21.5H46ZM46 4.37114e-08V15H45V0L46 4.37114e-08Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 69.5L46 58H45L45 69.5H46ZM46 91V76H45V91H46Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M52 46H39V45H52V46Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 14.2929L52.2175 21.0104L51.5104 21.7175L45.5 15.7071L39.4896 21.7175L38.7825 21.0104L45.5 14.2929Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 76.435L52.2175 69.7175L51.5104 69.0104L45.5 75.0208L39.4896 69.0104L38.7825 69.7175L45.5 76.435Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 20.2929L52.2175 27.0104L51.5104 27.7175L45.5 21.7071L39.4896 27.7175L38.7825 27.0104L45.5 20.2929Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 70.435L52.2175 63.7175L51.5104 63.0104L45.5 69.0208L39.4896 63.0104L38.7825 63.7175L45.5 70.435Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$l {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$l,
      name: 'BreakerCartWorkPositionBreakerOff',
      title: 'Тележка выключателя КРУ в рабочем положении, выключатель отключен',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$l);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$k = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 13.2929L52.2175 20.0104L51.5104 20.7175L45.5 14.7071L39.4896 20.7175L38.7825 20.0104L45.5 13.2929Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 4.37114e-08V14H45V0L46 4.37114e-08Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 20H51V21H40V20Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 77.435L52.2175 70.7175L51.5104 70.0104L45.5 76.0208L39.4896 70.0104L38.7825 70.7175L45.5 77.435Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 91V76H46V91H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 70.7279H51V69.7279H40V70.7279Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 21.2929L52.2175 28.0104L51.5104 28.7175L45.5 22.7071L39.4896 28.7175L38.7825 28.0104L45.5 21.2929Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 69.435L52.2175 62.7175L51.5104 62.0104L45.5 68.0208L39.4896 62.0104L38.7825 62.7175L45.5 69.435Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M57 34H34V57H57V34ZM33 33V58H58V33H33Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M52 46H39V45H52V46Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 33L45 22H46L46 33H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 68L45 57H46L46 68H45Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$k {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$k,
      name: 'BreakerCartRepairPositionBreakerOff',
      title: 'Тележка выключателя КРУ в ремонтном положении, выключатель отключен',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$k);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$j = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 13.2929L52.2175 20.0104L51.5104 20.7175L45.5 14.7071L39.4896 20.7175L38.7825 20.0104L45.5 13.2929Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 4.37114e-08V14H45V0L46 4.37114e-08Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 20H51V21H40V20Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 77.435L52.2175 70.7175L51.5104 70.0104L45.5 76.0208L39.4896 70.0104L38.7825 70.7175L45.5 77.435Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 91V76H46V91H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 70.7279H51V69.7279H40V70.7279Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 21.2929L52.2175 28.0104L51.5104 28.7175L45.5 22.7071L39.4896 28.7175L38.7825 28.0104L45.5 21.2929Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 69.435L52.2175 62.7175L51.5104 62.0104L45.5 68.0208L39.4896 62.0104L38.7825 62.7175L45.5 69.435Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M57 34H34V57H57V34ZM33 33V58H58V33H33Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M52 46H39V45H52V46Z' fill='black'/%3e %3cpath d='M65.14 40H63.7L61.46 37.19L60.88 37.87V40H59.71V33.33H60.88V36.51L63.49 33.33H64.94L62.23 36.48L65.14 40Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 22L46 33H45L45 22H46Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 68.1V57H46V68.1H45Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$j {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$j,
      name: 'BreakerCartControlPositionBreakerOff',
      title: 'Тележка выключателя КРУ в контрольном положении, выключатель отключен',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$j);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

var BreakerCarts = [
  ObjectModelPrimitive$m,
  ObjectModelPrimitive$l,
  ObjectModelPrimitive$k,
  ObjectModelPrimitive$j,
];

const img$i = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg clip-path='url(%23clip0_53_242)'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 21.5L46 62H45L45 21.5H46ZM46 4.37114e-08V15H45V0L46 4.37114e-08Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 69.5V58H45V69.5H46ZM46 91V76H45V91H46Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 14.2929L52.2175 21.0104L51.5104 21.7175L45.5 15.7071L39.4896 21.7175L38.7825 21.0104L45.5 14.2929Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 76.435L52.2175 69.7175L51.5104 69.0104L45.5 75.0208L39.4896 69.0104L38.7825 69.7175L45.5 76.435Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 20.2929L52.2175 27.0104L51.5104 27.7175L45.5 21.7071L39.4896 27.7175L38.7825 27.0104L45.5 20.2929Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 70.435L52.2175 63.7175L51.5104 63.0104L45.5 69.0208L39.4896 63.0104L38.7825 63.7175L45.5 70.435Z' fill='black'/%3e %3c/g%3e %3cdefs%3e %3cclipPath id='clip0_53_242'%3e %3crect width='91' height='91' fill='white'/%3e %3c/clipPath%3e %3c/defs%3e%3c/svg%3e";

class ObjectModelPrimitive$i {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$i,
      name: 'DisconnectorCartWorkPosition',
      title: 'Тележка разъединителя КРУ в рабочем положении',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$i);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$h = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 13.2929L52.2176 20.0104L51.5104 20.7175L45.5 14.7071L39.4896 20.7175L38.7825 20.0104L45.5 13.2929Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 4.37114e-08L46 14H45L45 0L46 4.37114e-08Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 20H51V21H40V20Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 77.435L52.2176 70.7175L51.5104 70.0104L45.5 76.0208L39.4896 70.0104L38.7825 70.7175L45.5 77.435Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 91L45 76H46L46 91H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 70.7279H51V69.7279H40V70.7279Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 21.2929L52.2175 28.0104L51.5104 28.7175L45.5 22.7071L39.4896 28.7175L38.7825 28.0104L45.5 21.2929Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 69.435L52.2175 62.7175L51.5104 62.0104L45.5 68.0208L39.4896 62.0104L38.7825 62.7175L45.5 69.435Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 68L45 22H46L46 68H45Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$h {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$h,
      name: 'DisconnectorCartRepairPosition',
      title: 'Тележка разъединителя КРУ в ремонтном положении',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$h);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$g = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath d='M65.14 40H63.7L61.46 37.19L60.88 37.87V40H59.71V33.33H60.88V36.51L63.49 33.33H64.94L62.23 36.48L65.14 40Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 13.2929L52.2175 20.0104L51.5104 20.7175L45.5 14.7071L39.4896 20.7175L38.7825 20.0104L45.5 13.2929Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 4.37114e-08L46 14H45L45 0L46 4.37114e-08Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 20H51V21H40V20Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 77.435L52.2175 70.7175L51.5104 70.0104L45.5 76.0208L39.4896 70.0104L38.7825 70.7175L45.5 77.435Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 91L45 76H46L46 91H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 70.7279H51V69.7279H40V70.7279Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 21.2929L52.2175 28.0104L51.5104 28.7175L45.5 22.7071L39.4896 28.7175L38.7825 28.0104L45.5 21.2929Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 69.435L52.2175 62.7175L51.5104 62.0104L45.5 68.0208L39.4896 62.0104L38.7825 62.7175L45.5 69.435Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 68L45 22H46L46 68H45Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$g {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$g,
      name: 'DisconnectorCartControlPosition',
      title: 'Тележка разъединителя КРУ в контрольном положении',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$g);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

var DisconnectorCarts = [
  ObjectModelPrimitive$i,
  ObjectModelPrimitive$h,
  ObjectModelPrimitive$g,
];

const img$f = "data:image/svg+xml,%3csvg width='91' height='119' viewBox='0 0 91 119' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 75C57.9264 75 68 64.9264 68 52.5C68 40.0736 57.9264 30 45.5 30C33.0736 30 23 40.0736 23 52.5C23 64.9264 33.0736 75 45.5 75ZM45.5 77C59.031 77 70 66.031 70 52.5C70 38.969 59.031 28 45.5 28C31.969 28 21 38.969 21 52.5C21 66.031 31.969 77 45.5 77Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M60.9656 29.9952C56.8738 24.8203 51.3235 21.669 45.2304 19.963L45.7696 18.037C52.1765 19.831 58.1262 23.1797 62.5344 28.7548C66.9447 34.3325 69.7455 42.0546 69.9997 52.4756L68.0003 52.5244C67.7545 42.4454 65.0553 35.1675 60.9656 29.9952Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 117C57.9264 117 68 106.926 68 94.5C68 82.0736 57.9264 72 45.5 72C33.0736 72 23 82.0736 23 94.5C23 106.926 33.0736 117 45.5 117ZM45.5 119C59.031 119 70 108.031 70 94.5C70 80.969 59.031 70 45.5 70C31.969 70 21 80.969 21 94.5C21 108.031 31.969 119 45.5 119Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 4.37114e-08V20H45V0L46 4.37114e-08Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 84L35 102H56L45.5 84ZM45.5 85.9846L36.741 101H54.259L45.5 85.9846Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46.6805 51.7942L53.3158 46.3876L52.6842 45.6124L45.5 51.4661L38.3158 45.6124L37.6842 46.3876L45 52.3487V61H46V52.6978L52.3438 53.7159L52.5023 52.7285L46.6805 51.7942Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$f {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$f,
      name: 'AutoTransformerThreeWinding',
      title: 'Автотрансформатор 3-х обмоточный',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$f);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$e = "data:image/svg+xml,%3csvg width='91' height='119' viewBox='0 0 91 119' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 75C57.9264 75 68 64.9264 68 52.5C68 40.0736 57.9264 30 45.5 30C33.0735 30 23 40.0736 23 52.5C23 64.9264 33.0735 75 45.5 75ZM45.5 77C59.0309 77 70 66.031 70 52.5C70 38.969 59.0309 28 45.5 28C31.969 28 21 38.969 21 52.5C21 66.031 31.969 77 45.5 77Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M60.9655 29.9952C56.8737 24.8203 51.3235 21.669 45.2303 19.963L45.7696 18.037C52.1765 19.831 58.1262 23.1797 62.5344 28.7548C66.9447 34.3325 69.7455 42.0546 69.9997 52.4756L68.0003 52.5244C67.7544 42.4454 65.0552 35.1675 60.9655 29.9952Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 117C57.9264 117 68 106.926 68 94.5C68 82.0736 57.9264 72 45.5 72C33.0735 72 23 82.0736 23 94.5C23 106.926 33.0735 117 45.5 117ZM45.5 119C59.0309 119 70 108.031 70 94.5C70 80.969 59.0309 70 45.5 70C31.969 70 21 80.969 21 94.5C21 108.031 31.969 119 45.5 119Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 4.37113e-08V20H45V0L46 4.37113e-08Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 84L35 102H56L45.5 84ZM45.5 85.9846L36.741 101H54.2589L45.5 85.9846Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46.6805 51.7942L53.3158 46.3876L52.6841 45.6124L45.5 51.4661L38.3158 45.6124L37.6841 46.3876L45 52.3487V61H46V52.6978L52.3438 53.7159L52.5023 52.7285L46.6805 51.7942Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M74.2027 40.5179L84.3234 36.6898L77.6882 44.7939L76.9145 44.1604L79.9658 40.4336L11.0737 89.862L10.4907 89.0495L79.3634 39.6351L74.5564 41.4533L74.2027 40.5179Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$e {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$e,
      name: 'AutoTransformerThreeWindingLoadRegulation',
      title: 'Автотрансформатор 3-х обмоточный с РПН',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$e);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

var AutoTransformers = [
  ObjectModelPrimitive$f,
  ObjectModelPrimitive$e,
];

const img$d = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 1.31134e-07L46 11.5H45L45 0L46 1.31134e-07Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 79.5V91H45V79.5H46Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 34.5C39.4249 34.5 34.5 39.4249 34.5 45.5C34.5 51.5751 39.4249 56.5 45.5 56.5V57.5C38.8726 57.5 33.5 52.1274 33.5 45.5C33.5 38.8726 38.8726 33.5 45.5 33.5V34.5Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 11.5C39.4249 11.5 34.5 16.4249 34.5 22.5C34.5 28.5751 39.4249 33.5 45.5 33.5V34.5C38.8726 34.5 33.5 29.1274 33.5 22.5C33.5 15.8726 38.8726 10.5 45.5 10.5V11.5Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 57.5C39.4249 57.5 34.5 62.4249 34.5 68.5C34.5 74.5751 39.4249 79.5 45.5 79.5V80.5C38.8726 80.5 33.5 75.1274 33.5 68.5C33.5 61.8726 38.8726 56.5 45.5 56.5V57.5Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$d {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$d,
      name: 'PetersenCoil',
      title: 'Дугогасящие реакторы',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$d);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$c = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 1.31134e-07L46 11.5H45L45 0L46 1.31134e-07Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 79.5V91H45V79.5H46Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 34.5C39.4248 34.5 34.5 39.4249 34.5 45.5C34.5 51.5751 39.4248 56.5 45.5 56.5V57.5C38.8726 57.5 33.5 52.1274 33.5 45.5C33.5 38.8726 38.8726 33.5 45.5 33.5V34.5Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 11.5C39.4248 11.5 34.5 16.4249 34.5 22.5C34.5 28.5751 39.4248 33.5 45.5 33.5V34.5C38.8726 34.5 33.5 29.1274 33.5 22.5C33.5 15.8726 38.8726 10.5 45.5 10.5V11.5Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 57.5C39.4248 57.5 34.5 62.4249 34.5 68.5C34.5 74.5751 39.4248 79.5 45.5 79.5V80.5C38.8726 80.5 33.5 75.1274 33.5 68.5C33.5 61.8726 38.8726 56.5 45.5 56.5V57.5Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M56.0067 21.9263L64.6718 15.4456L60.54 25.07L59.6211 24.6755L61.5005 20.2976L18.1477 75.658L17.3604 75.0415L60.7625 19.6182L56.6057 22.7272L56.0067 21.9263Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$c {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$c,
      name: 'PetersenCoilSmoothRegulation',
      title: 'Дугогасящие реакторы с возможностью плавного регулирования',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$c);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

var PetersenCoils = [ObjectModelPrimitive$d, ObjectModelPrimitive$c];

const img$b = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 1.31134e-07L46 11.5H45L45 0L46 1.31134e-07Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 79.5V91H45V79.5H46Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 34.5C39.4249 34.5 34.5 39.4249 34.5 45.5C34.5 51.5751 39.4249 56.5 45.5 56.5V57.5C38.8726 57.5 33.5 52.1274 33.5 45.5C33.5 38.8726 38.8726 33.5 45.5 33.5V34.5Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 11.5C39.4249 11.5 34.5 16.4249 34.5 22.5C34.5 28.5751 39.4249 33.5 45.5 33.5V34.5C38.8726 34.5 33.5 29.1274 33.5 22.5C33.5 15.8726 38.8726 10.5 45.5 10.5V11.5Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 57.5C39.4249 57.5 34.5 62.4249 34.5 68.5C34.5 74.5751 39.4249 79.5 45.5 79.5V80.5C38.8726 80.5 33.5 75.1274 33.5 68.5C33.5 61.8726 38.8726 56.5 45.5 56.5V57.5Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$b {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$b,
      name: 'WaveTrap',
      title: 'Высокочастотный заградитель линии электропередачи',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$b);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$a = "data:image/svg+xml,%3csvg width='91' height='37' viewBox='0 0 91 37' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M65 4H24V33H65V4ZM22 2V35H67V2H22Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M37 8L37 29H35L35 8H37Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M50 8V29H48V8H50Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M59 10H50V8H59V10Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M61 8V29H59V8H61Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M37 10V19H43V10H37ZM36 8C35.4477 8 35 8.44772 35 9V20C35 20.5523 35.4477 21 36 21H44C44.5523 21 45 20.5523 45 20V9C45 8.44772 44.5523 8 44 8H36Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M30 10V19H35V10H30ZM29 8C28.4477 8 28 8.44772 28 9V20C28 20.5523 28.4477 21 29 21H36C36.5523 21 37 20.5523 37 20V9C37 8.44772 36.5523 8 36 8H29Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$a {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$a,
      name: 'ConnectionFilter',
      title: 'Фильтр присоединения',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 40);
    instance.style = new ImageNodeStyle(img$a);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$9 = "data:image/svg+xml,%3csvg width='91' height='19' viewBox='0 0 91 19' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 4.37114e-08L46 7H45L45 0L46 4.37114e-08Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 19L46 12H45L45 19H46Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 7L51 7V8L40 8L40 7Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40 12L51 12V11L40 11L40 12Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$9 {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$9,
      name: 'Capacitor',
      title: 'Конденсатор',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$9);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$8 = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg clip-path='url(%23clip0_53_237)'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 11V1.19249e-08L46 0V11H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M37 80H54V81H37V80Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M44 90H47V91H44V90Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M41 85H50V86H41V85Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 80L45 58H46L46 80H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M51 12H40V57H51V12ZM39 11V58H52V11H39Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M33.5 46.4093L58.4078 11.2892L57.5922 10.7108L32.5 46.0907V58H33.5V46.4093Z' fill='black'/%3e %3c/g%3e %3cdefs%3e %3cclipPath id='clip0_53_237'%3e %3crect width='91' height='91' fill='white'/%3e %3c/clipPath%3e %3c/defs%3e%3c/svg%3e";

class ObjectModelPrimitive$8 {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$8,
      name: 'SurgeArrester',
      title: 'Ограничитель перенапряжений',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$8);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$7 = "data:image/svg+xml,%3csvg width='91' height='91' viewBox='0 0 91 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg clip-path='url(%23clip0_53_239)'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 11V1.19249e-08L46 0V11H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M37 80H54V81H37L37 80Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M44 90H47V91H44L44 90Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M41 85H50V86H41V85Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 80L45 58H46L46 80H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M51 12H40V57H51V12ZM39 11V58H52V11H39Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 19L45 2H46L46 19H45Z' fill='black'/%3e %3cpath d='M45.5 27L42 16H49L45.5 27Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 40L45 57H46L46 40H45Z' fill='black'/%3e %3cpath d='M45.5 32L42 43H49L45.5 32Z' fill='black'/%3e %3c/g%3e %3cdefs%3e %3cclipPath id='clip0_53_239'%3e %3crect width='91' height='91' fill='white'/%3e %3c/clipPath%3e %3c/defs%3e%3c/svg%3e";

class ObjectModelPrimitive$7 {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$7,
      name: 'Arrester',
      title: 'Разрядник',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$7);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$6 = "data:image/svg+xml,%3csvg width='91' height='59' viewBox='0 0 91 59' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg clip-path='url(%23clip0_53_291)'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M50 7H41V52H50V7ZM40 6V53H51V6H40Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 4.37115e-08L46 60H45L45 0L46 4.37115e-08Z' fill='black'/%3e %3c/g%3e %3cdefs%3e %3cclipPath id='clip0_53_291'%3e %3crect width='91' height='59' fill='white'/%3e %3c/clipPath%3e %3c/defs%3e%3c/svg%3e";

class ObjectModelPrimitive$6 {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$6,
      name: 'Fuse',
      title: 'Предохранитель с плавкой вставкой',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$6);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$5 = "data:image/svg+xml,%3csvg width='91' height='65' viewBox='0 0 91 65' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg clip-path='url(%23clip0_53_202)'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M69 32.5C69 19.5213 58.4787 9 45.5 9V7C59.5833 7 71 18.4167 71 32.5C71 46.5833 59.5833 58 45.5 58C31.4167 58 20 46.5833 20 32.5H22C22 45.4787 32.5213 56 45.5 56C58.4787 56 69 45.4787 69 32.5Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 33L20 33L20 32L46 32V33Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 65L45 32L46 32L46 65H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 0V9H45V4.37115e-08L46 0Z' fill='black'/%3e %3c/g%3e %3cdefs%3e %3cclipPath id='clip0_53_202'%3e %3crect width='91' height='65' fill='white'/%3e %3c/clipPath%3e %3c/defs%3e%3c/svg%3e";

class ObjectModelPrimitive$5 {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$5,
      name: 'CurrentLimitingReactorSingle',
      title: 'Токоограничивающий реактор одинарный',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$5);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$4 = "data:image/svg+xml,%3csvg width='81' height='89' viewBox='0 0 81 89' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg clip-path='url(%23clip0_53_212)'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 65.55C55.7703 63.4654 63.5004 54.3854 63.5004 43.5C63.5004 31.0736 53.4268 21 41.0004 21C28.574 21 18.5004 31.0736 18.5004 43.5C18.5004 54.0289 25.7324 62.8687 35.5 65.3229V67.3801C24.6175 64.8838 16.5004 55.1398 16.5004 43.5C16.5004 29.969 27.4694 19 41.0004 19C54.5313 19 65.5004 29.969 65.5004 43.5C65.5004 55.4939 56.8818 65.4749 45.5 67.5877V65.55Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 41.4961H35.5V67H34.5V42.4961H0V41.4961Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M80.9999 41.4961H45.4999V66.9961H46.4999V42.4961H80.9999V41.4961Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M41 0L41.0004 19H40V4.37115e-08L41 0Z' fill='black'/%3e %3c/g%3e %3cdefs%3e %3cclipPath id='clip0_53_212'%3e %3crect width='81' height='89' fill='white'/%3e %3c/clipPath%3e %3c/defs%3e%3c/svg%3e";

class ObjectModelPrimitive$4 {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$4,
      name: 'CurrentLimitingReactorDouble',
      title: 'Токоограничивающий реактор сдвоенный',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$4);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0, y: 0.47 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'inPort2',
          type: ['IN', 'OUT'],
          portPosition: { x: 1, y: 0.47 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

var CurrentLimitingReactors = [ObjectModelPrimitive$5, ObjectModelPrimitive$4];

const img$3 = "data:image/svg+xml,%3csvg width='91' height='82' viewBox='0 0 91 82' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg clip-path='url(%23clip0_53_204)'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M69 34.5C69 21.5213 58.4787 11 45.5 11V9C59.5833 9 71 20.4167 71 34.5C71 48.5833 59.5833 60 45.5 60C31.4167 60 20 48.5833 20 34.5H22C22 47.4787 32.5213 58 45.5 58C58.4787 58 69 47.4787 69 34.5Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 35L20 35L20 34L46 34V35Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45 71V34L46 34V71H45Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M46 0V11H45V4.37114e-08L46 0Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M37 71H54V72H37V71Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M44 81H47V82H44V81Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M41 76H50V77H41V76Z' fill='black'/%3e %3c/g%3e %3cdefs%3e %3cclipPath id='clip0_53_204'%3e %3crect width='91' height='82' fill='white'/%3e %3c/clipPath%3e %3c/defs%3e%3c/svg%3e";

class ObjectModelPrimitive$3 {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$3,
      name: 'ShuntReactor',
      title: 'Реактор шунтирующий',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$3);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img$2 = "data:image/svg+xml,%3csvg width='91' height='82' viewBox='0 0 91 82' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg clip-path='url(%23clip0_53_206)'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M68.9999 34.5C68.9999 21.5213 58.4786 11 45.4999 11V9C59.5832 9 70.9999 20.4167 70.9999 34.5C70.9999 48.5833 59.5832 60 45.4999 60C31.4166 60 19.9999 48.5833 19.9999 34.5H21.9999C21.9999 47.4787 32.5212 58 45.4999 58C58.4786 58 68.9999 47.4787 68.9999 34.5Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.9999 35L19.9999 35L19.9999 34L45.9999 34V35Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M44.9999 71V34L45.9999 34V71H44.9999Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.9999 0V11H44.9999V4.37114e-08L45.9999 0Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M36.9999 71H53.9999V72H36.9999V71Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M43.9999 81H46.9999L46.9999 82H43.9999L43.9999 81Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M40.9999 76H49.9999V77H40.9999V76Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M70.534 16.6795L80.5666 12.6259L74.1144 20.8764L73.3266 20.2604L76.2616 16.5075L20.2107 58.9638L19.6069 58.1667L75.7215 15.6621L70.9086 17.6067L70.534 16.6795Z' fill='black'/%3e %3c/g%3e %3cdefs%3e %3cclipPath id='clip0_53_206'%3e %3crect width='91' height='82' fill='white'/%3e %3c/clipPath%3e %3c/defs%3e%3c/svg%3e";

class ObjectModelPrimitive$2 {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$2,
      name: 'ShuntReactorRegulation',
      title: 'Реактор шунтирующий с возможностью регулирования',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$2);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

var ShuntReactors = [ObjectModelPrimitive$3, ObjectModelPrimitive$2];

const img$1 = "data:image/svg+xml,%3csvg width='91' height='49' viewBox='0 0 91 49' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M45.5 47C57.9264 47 68 36.9264 68 24.5C68 12.0736 57.9264 2 45.5 2C33.0736 2 23 12.0736 23 24.5C23 36.9264 33.0736 47 45.5 47ZM45.5 49C59.031 49 70 38.031 70 24.5C70 10.969 59.031 0 45.5 0C31.969 0 21 10.969 21 24.5C21 38.031 31.969 49 45.5 49Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M35 22L56 22V23L35 23V22Z' fill='black'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M35 27L56 27V28L35 28V27Z' fill='black'/%3e%3c/svg%3e";

class ObjectModelPrimitive$1 {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img$1,
      name: 'SynchronousCompensator',
      title: 'Синхронный компенсатор',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img$1);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

const img = "data:image/svg+xml,%3csvg width='121' height='91' viewBox='0 0 121 91' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg clip-path='url(%23clip0_53_231)'%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M24.5 62C30.299 62 35 57.299 35 51.5C35 45.701 30.299 41 24.5 41C18.701 41 14 45.701 14 51.5C14 57.299 18.701 62 24.5 62ZM24.5 64C31.4036 64 37 58.4036 37 51.5C37 44.5964 31.4036 39 24.5 39C17.5964 39 12 44.5964 12 51.5C12 58.4036 17.5964 64 24.5 64Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M24.5 45C30.299 45 35 40.299 35 34.5C35 28.701 30.299 24 24.5 24C18.701 24 14 28.701 14 34.5C14 40.299 18.701 45 24.5 45ZM24.5 47C31.4036 47 37 41.4036 37 34.5C37 27.5964 31.4036 22 24.5 22C17.5964 22 12 27.5964 12 34.5C12 41.4036 17.5964 47 24.5 47Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M26 15L26 71H23L23 15H26Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M36 31L46 31V32L36 32V31Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M36 38L46 38V39L36 39V38Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M36 48L46 48V49L36 49V48Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M36 55L46 55V56L36 56V55Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M96.5 62C102.299 62 107 57.299 107 51.5C107 45.701 102.299 41 96.5 41C90.701 41 86 45.701 86 51.5C86 57.299 90.701 62 96.5 62ZM96.5 64C103.404 64 109 58.4036 109 51.5C109 44.5964 103.404 39 96.5 39C89.5964 39 84 44.5964 84 51.5C84 58.4036 89.5964 64 96.5 64Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M96.5 45C102.299 45 107 40.299 107 34.5C107 28.701 102.299 24 96.5 24C90.701 24 86 28.701 86 34.5C86 40.299 90.701 45 96.5 45ZM96.5 47C103.404 47 109 41.4036 109 34.5C109 27.5964 103.404 22 96.5 22C89.5964 22 84 27.5964 84 34.5C84 41.4036 89.5964 47 96.5 47Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M98 15V71H95V15H98Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M108 31L118 31V32L108 32V31Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M108 38L118 38V39L108 39V38Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M108 48L118 48V49L108 49V48Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M108 55L118 55V56L108 56V55Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M60.5 62C66.299 62 71 57.299 71 51.5C71 45.701 66.299 41 60.5 41C54.701 41 50 45.701 50 51.5C50 57.299 54.701 62 60.5 62ZM60.5 64C67.4036 64 73 58.4036 73 51.5C73 44.5964 67.4036 39 60.5 39C53.5964 39 48 44.5964 48 51.5C48 58.4036 53.5964 64 60.5 64Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M60.5 45C66.299 45 71 40.299 71 34.5C71 28.701 66.299 24 60.5 24C54.701 24 50 28.701 50 34.5C50 40.299 54.701 45 60.5 45ZM60.5 47C67.4036 47 73 41.4036 73 34.5C73 27.5964 67.4036 22 60.5 22C53.5964 22 48 27.5964 48 34.5C48 41.4036 53.5964 47 60.5 47Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M62 15L62 71H59L59 15H62Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M72 31L82 31V32H72V31Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M60 15V-1.52238e-05L61 -1.52588e-05V15H60Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M60 91V71H61V91H60Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M72 38H82V39H72V38Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M72 48H82V49H72V48Z' fill='%232E671D'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M72 55H82V56H72V55Z' fill='%232E671D'/%3e %3c/g%3e %3cdefs%3e %3cclipPath id='clip0_53_231'%3e %3crect width='121' height='91' fill='white'/%3e %3c/clipPath%3e %3c/defs%3e%3c/svg%3e";

class ObjectModelPrimitive {
  #yFiles;

  static getPrimitiveInfo() {
    return {
      icon: img,
      name: 'CurrentTransformer',
      title: 'Трансформатор тока',
      groups: ['Элементы электрических схем'],
    };
  }

  constructor(yFiles) {
    this.#yFiles = yFiles.default;
  }

  create() {
    const { Rect, SimpleNode, ImageNodeStyle } = this.#yFiles;

    const instance = new SimpleNode();
    instance.layout = new Rect(0, 0, 80, 80);
    instance.style = new ImageNodeStyle(img);

    instance.tag = {
      properties: {},
      initPorts: [
        {
          primitiveName: 'inPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 1 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
        {
          primitiveName: 'outPort1',
          type: ['IN', 'OUT'],
          portPosition: { x: 0.5, y: 0 },
          properties: {
            status: {
              expression: ``,
              type: 'expression',
            },
          },
        },
      ],
    };

    return instance;
  }
}

var primitivesList = [
  ...Breakers,
  ...LoadBreakSwitches,
  ...Disconnectors,
  ...GroundSwitches,
  ...ShortCircuiters,
  ...Separators,
  ...AutomaticBreakers,
  ...BreakerCarts,
  ...DisconnectorCarts,
  ...AutoTransformers,
  ...PowerTransformers,
  ...PetersenCoils,
  ...PotentialTransformers,
  ObjectModelPrimitive$b,
  ObjectModelPrimitive$a,
  ObjectModelPrimitive$9,
  ObjectModelPrimitive$8,
  ObjectModelPrimitive$7,
  ObjectModelPrimitive$6,
  ...CurrentLimitingReactors,
  ...ShuntReactors,
  ObjectModelPrimitive$1,
  ObjectModelPrimitive,
  ObjectModelPrimitive$B,
  ObjectModelPrimitive$A,
  ObjectModelPrimitive$z,
  ...BusbarSections,
  ...ACLineSegments,
  ...ACLineSegmentsCable,
];

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

class ExtensionElectricalSchemePrimitives extends ExtensionPlugin {

  primitives = {};

  static getRegistrationMeta() {
    return pluginMeta;
  }

  static getExtensionInfo() {
    const result = [];
    primitivesList.forEach(primitive => {
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

    primitivesList.forEach(PrimitiveClass => {
      const { name } = PrimitiveClass.getPrimitiveInfo();
      this.primitives[name] = PrimitiveClass.bind(null, yFiles);
    });
  }

}

export { ExtensionElectricalSchemePrimitives };
