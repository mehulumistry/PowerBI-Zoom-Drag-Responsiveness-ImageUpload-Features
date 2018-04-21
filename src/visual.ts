
module powerbi.extensibility.visual {
    "use strict";
    export class Visual implements IVisual {
        private target: HTMLElement;
        private updateCount: number;
        private settings: VisualSettings;
        private textNode: Text;
        private svg: d3.Selection<SVGElement>;

        private logo:d3.Selection<SVGImageElement>;

        private label: HTMLElement;
        firstValue: any;
        private xdata: any;
        private ydata:any;
        private container: d3.Selection<SVGElement>;
        private element: d3.Selection<HTMLElement>;
        private editMode:boolean;

        constructor(options: VisualConstructorOptions) {
            options.element.style.overflowX = 'auto';
            options.element.style.overflowY = 'auto';

            options.element.style.backgroundImage = "abc.png"
            console.log('Visual constructor', options);

            this.target = options.element;

            let svg = this.svg = d3.select(options.element).classed("svg-container",true)
                                    .append('svg').classed('svg-container-responsive', true);

            this.container = this.svg.append('g').classed("group",true);
         
            this.element = d3.select(options.element);
            this.editMode = true;
          
           this.toolbar(true);


        }

        public update(options: VisualUpdateOptions) {
            this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
            console.log('Visual update', options);
            
            document.querySelector('input[type="file"]').addEventListener('change', function() {
                
                    while(!this.files){
                        
                            console.log("I am the best");
                            var img = document.querySelector('img');  // $('img')[0]
                            img.src = URL.createObjectURL(this.files[0]); // set src to file url
                        
                    }
            });
           
            let xdata = [5, 10, 15, 20],
                ydata = [3, 17, 4, 6];

            this.svg.attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 600 400");


            // just playing with mouse coordinates.
            
           
            this.svg.on('mousemove', function() {
                let coordinates =  d3.mouse(this); 
                let mouseX:number = coordinates[0];
                let mouseY:number = coordinates[1];
                
            })
            
        
            /// zoom and drag function to set the properties

            let zoom = d3.behavior.zoom().
                                scaleExtent([1, 10])
                                .on("zoom", this.zoomed.bind(this));
            let drag = d3.behavior.drag().on("drag",this.dragged);
            
            this.container.call(zoom);


            this.container.append("circle")
                            .attr("cx", 50)
                            .attr("cy", 50)
                            .attr("r", 50)
                            .style("fill", 'green');
            this.container.append("circle")
                            .attr("cx", 50)
                            .attr("cy", 50)
                            .attr("r", 30)
                            .style("fill", 'blue');              
            
        }



        ///  zooming function

        public dragged() {
            let t = d3.transform(this.container.attr("transform")).translate;
            this.container.attr("transform", "translate(" +  [t[0] + ((<d3.DragEvent>d3.event).dx), t[1] + ((<d3.DragEvent>d3.event).dx)] + ")")
            console.log(((<d3.DragEvent>d3.event).dx));
           
          }
      
        public zoomed() {
           
            d3.select(".group").attr("transform", "translate(" + ((<d3.ZoomEvent>d3.event).translate) + ")scale(" + ((<d3.ZoomEvent>d3.event).scale) + ")");
            console.log("transform", "translate(" + ((<d3.ZoomEvent>d3.event).translate) + ")scale(" + ((<d3.ZoomEvent>d3.event).scale) + ")");
        }



        public onViewModeChanged(viewMode: ViewMode): void {
          console.log("hrlr");
        }

        public toolbar(forceRedraw: boolean) {
            
            $('<input type="file" class="file" accept="image/*">').appendTo(this.target);
            $('<img id="myImg" src="#" alt="image" height=200 width=100>').appendTo(this.target);

            d3.select('.file').on('change', function () {
                if (this.files && this.files.length > 0) {

                    var img = document.querySelector('img');  // $('img')[0]
                    img.src = URL.createObjectURL(this.files[0]); // set src to file url
                    console.log(img.src);

                }        
          });
        }



        private static parseSettings(dataView: DataView): VisualSettings {
            return VisualSettings.parse(dataView) as VisualSettings;
        }


        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
            return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
        }
    }
}







//import DataViewObjects = powerbi.extensibility.utils.dataview.DataViewObjects;

//module powerbi.extensibility.visual {
    
    //     interface ChartViewModel {
    //         dataPoints: ChartDataPoint[];
   
    //         maxColVal: number;
    //         minColVal: number;
    //         maxxVal : number;
    //         minxVal : number;
    //         maxyVal : number;
    //         minyVal: number;
    //     };
    //     interface ChartDataPoint {
    //         xVal: number;
    //         yVal: number;
    //         colVal:number;
    //         blockId: string;
    //         blkWidth: number;
    //         blkHeight: number;
    //     };

        

    //     // The below function will convert DataViewMapping Value from JSON to list of arrays I.E ViewModel to plot
    //     function visualTransform(options: VisualUpdateOptions, host: IVisualHost): ChartViewModel {
    //         let dataViews = options.dataViews;
        
    //         let viewModel: ChartViewModel = {
    //             dataPoints: [],
    //             maxColVal: 0,
    //             minColVal: 0,
    //             maxxVal : 0,
    //             minxVal : 0,
    //             maxyVal : 0,
    //             minyVal: 0
    //         };
    
    //         // it will remain same for all charts
    //         if (!dataViews
    //             || !dataViews[0]
    //             || !dataViews[0].categorical
    //             || !dataViews[0].categorical.categories
    //             || !dataViews[0].categorical.categories[0].source
    //             || !dataViews[0].categorical.values)
    //             return viewModel;
    
    //         // console.log("enter")
    //         // console.log(dataViews[0].categorical.values[3]);
    //         let categorical = dataViews[0].categorical;
    //         let blocks = categorical.categories[0]; // Block Id values
    //         let xCoord = categorical.values[0];
    //         let yCoord = categorical.values[1];
    //         let colorValue = categorical.values[2];
    //         let blkW = categorical.values[3];
    //         let blkH = categorical.values[4];

    //         let flag:boolean = true;
            
            
        

    //         if(!categorical.values[3]){
    //             //console.log("false");
    //             // fill with constant values of
    //             // var rectWidth = 5;
    //             // var rectHeight = 2;
    //             flag = false;

    //         }
    
    //         let ChartDataPoints: ChartDataPoint[] = [];
    //         let maxColVal: number;
    //         let maxxVal : number;
    //         let minxVal : number;
    //         let maxyVal : number;
    //         let minyVal : number;
    //         let minColVal:number;
    
    //         // take any max value you want or remove max function just input all the rows with same data
          

    //             if(flag){
    //                 for (let i = 0, len = Math.max(blocks.values.length, xCoord.values.length); i < len; i++) {
    //                     ChartDataPoints.push({
    //                         xVal: xCoord.values[i] as number,
    //                         yVal: yCoord.values[i] as number,
    //                         colVal: colorValue.values[i] as number,
    //                         blockId: blocks.values[i] as string,
    //                         blkWidth: blkW.values[i] as number,
    //                         blkHeight: blkH.values[i] as number,

    //                     });
    //                 }
    //             }

    //             // if no input is provided take default value for blocks
    //             else{
                    
    //                 for (let i = 0, len = Math.max(blocks.values.length, xCoord.values.length); i < len; i++) {
    //                     ChartDataPoints.push({
    //                         xVal: xCoord.values[i] as number,
    //                         yVal: yCoord.values[i] as number,
    //                         colVal: colorValue.values[i] as number,
    //                         blockId: blocks.values[i] as string,
    //                         blkWidth: 5 as number,
    //                         blkHeight: 2 as number,

    //                     });
    //                 }
    //             }


    //         maxColVal = <number>colorValue.maxLocal;
    //         minColVal = <number>colorValue.minLocal;
    //         maxxVal = <number>xCoord.maxLocal;
    //         minxVal = <number>xCoord.minLocal;
    //         maxyVal = <number>yCoord.maxLocal;
    //         minyVal = <number>yCoord.minLocal;

    //         return {
    //             dataPoints: ChartDataPoints,
    //             maxColVal: maxColVal,
    //             minColVal: minColVal,
    //             maxxVal: maxxVal,
    //             minxVal : minxVal,
    //             maxyVal : maxyVal,
    //             minyVal : minyVal
    //         };
    //     }


    //     export class BarChart implements IVisual {
    //         private svg: d3.Selection<SVGElement>;
    //         private svgG: d3.Selection<SVGElement>;
    //         private host: IVisualHost; 
    //         private tooltipServiceWrapper: ITooltipServiceWrapper;   
    //         private container: d3.Selection<SVGElement>;
    //         private xAxis: d3.Selection<SVGElement>;
    //         private yAxis: d3.Selection<SVGElement>;
    //         private emptyCont: d3.Selection<SVGElement>;


    //         private settings = {
    //             gradient: {
    //                 min: {
                   
    //                     color: {
    //                         default: "#FFF2EC",
    //                         value: "#FFF2EC"
    //                     },
    //                     value: {
    //                         default: 1,
    //                         value: 1
    //                     }
                        
    //                 },
    //                 max: {

    //                     color: {
    //                         default: "#6A010D",
    //                         value: "#6A010D"
    //                     },
    //                     value: {
    //                         default: 1000,
    //                         value: 1000
    //                     }
                       
    //                 }
    //             }  
    //         };

           

            
    
    //         constructor(options: VisualConstructorOptions) {
    //             options.element.style.overflowX = 'auto'
    //             options.element.style.overflowY = 'auto';


    //             this.host = options.host;       
    //             this.tooltipServiceWrapper = createTooltipServiceWrapper(this.host.tooltipService, options.element);    
               
    //             let svg = this.svg = d3.select(options.element).classed("svg-container",true)
    //                                  .append('svg').classed('svg-container-responsive', true);

                                     
                
    //             this.container = this.svg.append('g').classed("image",true);
    //             this.svgG = this.svg.append('g').classed("group",true);

    //             this.container.append('image')
    //             .attr('width',  1689)
    //             .attr('height', 763)
    //             .attr("xlink:href", "https://image.ibb.co/crhQnS/South_TFinal.png");//logo is a path
               
             
                
    //         }


    //         public update(options: VisualUpdateOptions) {
                          
    //             let viewModel:ChartViewModel = visualTransform(options,this.host);
    //             this.updateSettings(options); 

    //            // console.log("after updating");
    //            this.svg.attr("preserveAspectRatio", "xMinYMin meet")
    //            .attr("viewBox", "0 0 1689 763");
                
    //             let minVal = this.settings.gradient.min.value.value; 
    //             let maxVal = this.settings.gradient.max.value.value;
    //             let minCol = this.settings.gradient.min.color.value;
    //             let maxCol = this.settings.gradient.max.color.value;
    //             let colorScale = d3.scale.linear<string>().domain([minVal, maxVal]).range([minCol,maxCol]);
                
                
    //             //console.log(this.settings.gradient.min.value.value +"," +this.settings.gradient.max.value.value + " , "+ this.settings.gradient.min.color.value +"," + this.settings.gradient.max.color.value);
    //             let width =  options.viewport.width;
    //             let height = options.viewport.height;
                
    //             this.svg.attr({
    //                 width: width,
    //                 height: height,
                        
    //             });

    //             // X and Y Scale

    //             // let yScale = d3.scale.linear()
    //             //                      .domain([0,viewModel.maxyVal])
    //             //                      .range([0,height]);
                                    

    //             // let xScale = d3.scale.linear()
    //             //                      .domain([0,viewModel.maxxVal])
    //             //                      .range([0,width+926]);
                
    //             // zoom
    //             let zoom = d3.behavior.zoom()
    //                                    .scaleExtent([1, 70])
    //                                    .on("zoom", this.zoomed);

    //             // zoom 
            
    //             this.svg.call(zoom);
                
                
               
    //             let rect = this.svgG.selectAll("rect").data(viewModel.dataPoints);
                
             
                
    //             rect.enter().append("rect")

    //                 .attr("width", d => d.blkWidth)
    //                 .attr("height",d => d.blkHeight )
    //                 .attr("x", function(d) { return d.xVal; })
    //                 .attr("y",  function(d) { return d.yVal; })
    //                 .attr("fill",d => colorScale(d.colVal))
    //                 .on("mouseover", function() {return d3.select(this)
    //                     .attr("fill", "blue")})
    //                 .on("mouseout", function(d, i) {return d3.select(this)
    //                     .attr("fill", colorScale(d.colVal)) ;});
                   
    //             rect.exit().remove() ;
                
    //             ////////  ToolTip /////////////////
    //             this.tooltipServiceWrapper.addTooltip(this.svgG.selectAll('rect'), 
    //             (tooltipEvent: TooltipEventArgs<number>) => this.getTooltipData(tooltipEvent.data),
    //             (tooltipEvent: TooltipEventArgs<number>) => null);
             
            
               
    //             rect.exit().remove() ;
                
                
    //         }

    //         public updateSettings(options: VisualUpdateOptions) {
       
    //                 let tempSettings = JSON.parse(JSON.stringify(DataViewObjects.getValue(options.dataViews[0].metadata.objects, { objectName: "dataPoint", propertyName: "fillRule"},this.settings.gradient)));
    //                 this.settings.gradient.max.color.value = tempSettings.linearGradient2.max.color;
    //                 this.settings.gradient.min.color.value = tempSettings.linearGradient2.min.color;
    //                 this.settings.gradient.max.value.value = tempSettings.linearGradient2.max.value;
    //                 this.settings.gradient.min.value.value = tempSettings.linearGradient2.min.value;
                 
                    
    //         } 
    //         public destroy(): void {
    //             //Perform any cleanup tasks here
    //         }

    //         // zooming function
    //         public zoomed() {
                
    //              d3.select(".group").attr("transform", "translate(" + ((<d3.ZoomEvent>d3.event).translate) + ")scale(" + ((<d3.ZoomEvent>d3.event).scale) + ")");
    //             //  console.log("transform", "translate(" + ((<d3.ZoomEvent>d3.event).translate) + ")scale(" + ((<d3.ZoomEvent>d3.event).scale) + ")");
    //          }

    //          ////////// ToolTip Data //////////////


    //         public getTooltipData(value: any): VisualTooltipDataItem[] {
                
    //                 // CHANGE THE value here for tool tip Sync
    //                 let colorScl = d3.scale.linear<string>().domain([this.settings.gradient.min.value.value, this.settings.gradient.max.value.value]).range([this.settings.gradient.min.color.value, this.settings.gradient.max.color.value]);
                    
    //                 return [{  
    //                     displayName: value.blockId,
    //                     value: "x: " +value.xVal.toString() +" "+ "y: " + value.yVal.toString(),
    //                     color: colorScl(value.colVal),
    //                     header: 'Block Information'
    //                 }];
    //         }

    //         public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
                
    //                 let propertyGroupName = options.objectName;
    //                 let properties: VisualObjectInstance[] = [];
    //                 switch (propertyGroupName) {
        
    //                     case "dataPoint":
    //                         //console.log("inside case")
    //                         properties.push({
    //                             objectName: propertyGroupName,
    //                             properties: {
    //                                 FillRule:{
    //                                     linearGradient2:{
    //                                         max: {
    //                                             color: this.settings.gradient.max.color.value,
    //                                             value: this.settings.gradient.max.value.value
    //                                         },
    //                                         min: {
    //                                             color: this.settings.gradient.min.color.value,
    //                                             value: this.settings.gradient.min.value.value
    //                                         }
    //                                     }
    //                                 }     
    //                             },
    //                             selector: null
    //                         });
    //                         break;
    //                 }                
    //                 return properties;
    //         }  
    //     }
    // }

    