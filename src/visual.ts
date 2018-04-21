
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

