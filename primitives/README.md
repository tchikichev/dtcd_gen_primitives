# dtcd_gen_primitives
scripts for raw primitives generation

## structure

well_primitives.csv ["ports"] >> ports config

<!-- to implement:
* 'pair_vertical_directed_indication'
* 'pair_vertical_directed'
* 'single_center' -->

props::
files in folder props

## pipeline

1. put .svg images
1. create new .csv table: primitives config

### add properties
1. generate primitive with empty properties
    1. use datacad editor to create properties template
    1. download & export properties to PROPS dir
1. geenrate primitives with corresponding props 

### fix image size

1. put generated primitives in datacad workspace
1. put each node on workspace, update nodes size WRT each other size
1. download .json, filter by primitiveID and select node size
1. update TABLE used in primitive generation, generate again


### custom ports location

NOTE:: axis are x(l>>r), y(top>>down == inverted)

1. PORTS_CONFIGURATION.json used for multiple conformed ports definition
1. add new templates if needed
1. refer to template name in config TABLE

NOTE:: single center port is preferred for drawing, some probkems when using autoArrange. 

NOTE:: For proper work use only "In" | "Out" ports. 
`["In","Out"]` ports can't be used for proper value passing in and out of primitive, to prevent rewriting consider different ports


