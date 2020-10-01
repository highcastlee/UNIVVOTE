am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.padding(40, 40, 40, 40);
    
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "major";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;
    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min =0;
    
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "major";
    series.dataFields.valueX = "vote";
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
    // t = {_value: {r: 40, g: 44, b: 117}};
    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function(fill, target){
      // console.log(chart.colors.getIndex(target.));
      return t._value;
    });
    
    categoryAxis.sortBySeries = series;
    chart.data = [
        {
          "major": "산업정보시스템",
          "vote": 22,
        },
        {
          "major": "MSDE",
          "vote": 43
        },
        {
          "major": "전자정보미디어",
          "vote": 10
        },
        {
          "major": "안전공학과",
          "vote": 24
        },
        {
          "major": "경영학과",
          "vote": 15
        },
        {
          "major": "GTM",
          "vote": 10
        },
        {
          "major": "ITM",
          "vote": 20
        },
        {
          "major": "식품공학과",
          "vote": 32
        },
        {
          "major": "기계자동차공학과",
          "vote": 10
        },
        {
          "major": "디자인학과",
          "vote": 10
        }
      ]
    
    
    
}); // end am4core.ready()