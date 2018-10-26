function generateLegends() {
    const MAIN_COLOR = "#f79f62" //橙色

    const WIDTH = window.outerWidth < 640? window.outerWidth : 640;
    const HEIGHT = window.outerHeight
    const HEIGHT_ratio = WIDTH < 550 ? 0.8 : 1
    const padding = 10

    const MIN_COLOR = d3.rgb("#6f7b6f")
    const MAX_COLOR = d3.rgb('#6f7b6f')
    const x_start = 25 * WIDTH / 640
    const x_end = x_start + WIDTH / 640 * 125 // 按照屏幕宽度调整长度
    

    const svg = d3.select("#legend")
                  .append("svg").style("width", x_end + 15).style("height", HEIGHT_ratio * 200)
                  .style("background", "#fff5")
    // colorScale
    const provinceColorScale = d3.scaleLinear()
        .domain([1,20])
        .range([MIN_COLOR, MAX_COLOR]);

        // radiusScale
        const rScale = d3.scaleLinear()
        .domain([0, 30])
        .range([0, 900])

        //定义一个线性渐变
        const defs = svg.append("defs");
        const linearGradient = defs.append("linearGradient")
                                 .attr("id","linearColor")
                                 .attr("x1","0%")
                                 .attr("y1","0%")
                                 .attr("x2","100%")
                                 .attr("y2","0%");
        const stop1 = linearGradient.append("stop")
                                  .attr("offset","0%")
                                  .style("stop-color",MIN_COLOR.toString())
                                  .style("stop-opacity","0");
        const stop2 = linearGradient.append("stop")
                                  .attr("offset","100%")
                                  .style("stop-color",MAX_COLOR.toString())
                                  .style("stop-opacity","1");




        //添加一个矩形，并应用线性渐变
        svg.append("rect")
           .attr("x", x_start)
           .attr("y", 30)
           .attr("width", x_end - x_start)
           .attr("height", 15 * HEIGHT_ratio)
           .style("fill","url(#" + linearGradient.attr("id") + ")");

        const svg_province_group = svg.append("g")
        svg_province_group.append("text")
                          .text("省内疫情数量（件）")
                          .attr("fill", "black")
                          .attr("text-anchor", "start")
                          .attr("transform","translate("+ (x_start + 5)+",+" + 20*HEIGHT_ratio +")")

        svg_province_group.append("path")
                          .attr("d", `M${x_start},30L${x_start},`+ 70*HEIGHT_ratio )
                          .attr("stroke", "black")
                          .attr("stroke-width", "1px")
        svg_province_group.append("text")
                          .text(0)
                          .attr("fill", "black")
                          .attr("text-anchor", "start")
                          .attr("transform","translate("+ (x_start + 5)+ "," + 70*HEIGHT_ratio +")")
        svg_province_group.append("path")
                          .attr("d", `M${x_end},30L${x_end},`+ 70 * HEIGHT_ratio)
                          .attr("stroke", "black")
                          .attr("stroke-width", "1px")
        svg_province_group.append("text")
                          .text(16)
                          .attr("fill", "black")
                          .attr("text-anchor", "end")
                          .attr("transform","translate("+ (x_end - 5)+","+ 70*HEIGHT_ratio +")")
        
        const svg_circle_group = svg.append("g")
        
        svg_circle_group.append("text")
                        .text("每起疫情死亡数量（只）")
                        .attr("fill", "black")
                        .attr("text-anchor", "start")
                        .attr("transform","translate("+ (x_start + 5)+"," + 110 * HEIGHT_ratio + ")")

        svg_circle_group.append("circle")
                        .attr("fill", MAIN_COLOR)
                        .attr("r", 8)
                        .attr("transform","translate("+ (x_start + 20)+"," + 140 * HEIGHT_ratio + ")")
        
        svg_circle_group.append("text")
                          .text(64)
                          .attr("fill", "black")
                          .attr("text-anchor", "middle")
                          .attr("transform","translate("+ (x_start + 20)+"," + 180 * HEIGHT_ratio + ")")
        
        svg_circle_group.append("circle")
                        .attr("fill", MAIN_COLOR)
                        .attr("r", 15)
                        .attr("transform","translate("+ (x_start + 60)+"," + 140 * HEIGHT_ratio + ")")
 
        svg_circle_group.append("text")
                          .text(225)
                          .attr("fill", "black")
                          .attr("text-anchor", "middle")
                          .attr("transform","translate("+ (x_start + 60)+"," + 180 * HEIGHT_ratio + ")")  

        if (WIDTH > 550) {
            svg_circle_group.append("circle")
                            .attr("fill", MAIN_COLOR)
                            .attr("r", 20)
                            .attr("transform","translate("+ (x_start + 115)+"," + 140 * HEIGHT_ratio+ ")")

            svg_circle_group.append("text")
                              .text(400)
                              .attr("fill", "black")
                              .attr("text-anchor", "middle")
                              .attr("transform","translate("+ (x_start + 115)+"," + 180 * HEIGHT_ratio+ ")")
        }
  
        return svg.node()
}
