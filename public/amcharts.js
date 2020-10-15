window.onload = function(){
  const req = new XMLHttpRequest();
  let jsonObj;
  let majorInfo,majorParsed;

  req.responseType = 'text';
  req.open("GET","majorInfo.json",true);
  req.send(null);
  req.addEventListener("load",function(){
      jsonObj = req.responseText;
      // console.log("majorName JSON : "+jsonObj);
      majorInfo = jsonObj;
      majorParsed = JSON.parse(majorInfo);
      
      ;
      am4core.ready(function() {
        console.log('am4core 실행됨!!!!!!!!!!!!!!!!');
        // Themes begin
        am4core.useTheme(am4themes_dark);
        am4core.useTheme(am4themes_animated);
        // Themes end

        var chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.padding(40, 40, 40, 40);

        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "majorName";
        categoryAxis.renderer.minGridDistance = 1;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.grid.template.disabled = true;
        var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min =0;

        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryY = "majorName";
        series.dataFields.valueX = "voteCount";
        series.tooltipText = "{valueX.value}"
        series.columns.template.strokeOpacity = 0;
        series.columns.template.column.cornerRadiusBottomRight = 5;
        series.columns.template.column.cornerRadiusTopRight = 5;

        var labelBullet = series.bullets.push(new am4charts.LabelBullet())
        labelBullet.label.horizontalCenter = "left";
        labelBullet.label.dx = 10;
        labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.as')}";
        labelBullet.locationX = 1;

        var t = {_value: {r: 82, g: 89, b: 223}};
        // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        series.columns.template.adapter.add("fill", function(fill, target){
          // console.log(chart.colors.getIndex(target.));
          return t._value;
        });

        categoryAxis.sortBySeries = series;
        console.log(majorParsed);
        chart.data = majorParsed;
        
    });
  },false);
}
