var xmlhttp = new XMLHttpRequest();
//==============FOR THE GLOBAL DATA=============

var url = "https://api.covid19api.com/summary";
xmlhttp.open("GET", url, true);

xmlhttp.send();

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);
    // console.log(data);

    document.getElementById("name-global").innerHTML = "Global";

    //------confirmed total value display----------

    const value_confirmed = data.Global.TotalConfirmed;
    const number_formatting = new Intl.NumberFormat("en-IN");
    document.getElementById("active-name").innerHTML = "Total Confirmed";

    document.getElementById("active-values").innerHTML =
      number_formatting.format(value_confirmed);
    const values_newConfirmed = data.Global.NewConfirmed;
    document.getElementById("new-values").innerHTML = "+";

    document.getElementById("new1-values").innerHTML =
      number_formatting.format(values_newConfirmed);

    //  --------------Death total display-------------------

    const value_totaldeaths = data.Global.TotalDeaths;
    document.getElementById("death-name").innerHTML = "Total Deaths";

    document.getElementById("Deaths-values").innerHTML =
      number_formatting.format(value_totaldeaths);
    const values_newDeaths = data.Global.NewDeaths;
    document.getElementById("new-death-plus-values").innerHTML = "+";

    document.getElementById("new-deaths-values").innerHTML =
      number_formatting.format(values_newDeaths);
  }
};

//---------For the country wise data----------

var myForm = document.getElementById("myForm");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();

  document.getElementById("new-values").innerHTML = "";
  document.getElementById("new1-values").innerHTML = "";
  document.getElementById("new-death-plus-values").innerHTML = "";
  document.getElementById("new-deaths-values").innerHTML = "";
  document.getElementById("name-global").innerHTML = "";

  var country = document.getElementById("country").value;

  var xmlhttp = new XMLHttpRequest();

  var url = "https://api.covid19api.com/dayone/country/" + country;
  xmlhttp.open("GET", url, true);

  xmlhttp.send();

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      // console.log(data);

      var Country_Name = data[0].Country;
      // console.log(Country_Name);

      var Country = data.map(function (elem) {
        return elem.Country;
      });
      // console.log(Country);

      var Deaths = data.map(function (elem) {
        return elem.Deaths;
      });
      // console.log(Deaths);

      var Active = data.map(function (elem) {
        return elem.Active;
      });
      // console.log(Active);

      var Confirmed = data.map(function (elem) {
        return elem.Confirmed;
      });
      // console.log(Confirmed);

      var index = data.length;
      var values = index - 1;
      // console.log(values);
      // console.log(value_active);

      //------active total value display----------

      const value_active = data[values].Active;

      // console.log(data[values].Confirmed);

      const number_formatting = new Intl.NumberFormat("en-IN");

      document.getElementById("active-name").innerHTML = "Active";
      document.getElementById("active-values").innerHTML =
        number_formatting.format(value_active);

      //-------------confirmed total value display------------

      const value_confirm = data[values].Confirmed;
      console.log(data[values].Confirmed);
      document.getElementById("confirmed-name").innerHTML = "Confirmed";
      document.getElementById("Confirmed-values").innerHTML =
        number_formatting.format(value_confirm);

      //------------Deaths total value display-------

      const value_death = data[values].Deaths;
      console.log(data[values].Confirmed);
      document.getElementById("death-name").innerHTML = "Deaths";
      document.getElementById("Deaths-values").innerHTML =
        number_formatting.format(value_death);
      document.getElementById("Country_name").innerHTML = Country_Name;

      Confirmed.innerHTML = "";
      Active.innerHTML = "";
      Deaths.innerHTML = "";

      var ctx = document.getElementById("Active").getContext("2d");
      let Chartstatus_Active = Chart.getChart("Active");

      if (Chartstatus_Active != undefined) {
        Chartstatus_Active.destroy();
      }

      var Active = new Chart(ctx, {
        type: "line",
        data: {
          labels: Country,

          datasets: [
            {
              label: "Active",
              data: Active,
              backgroundColor: "green",
              fill: true,
              borderColor: ["green"],

              borderWidth: 4,
            },
          ],
        },
        options: {
          maintainaspectratio: false,
          elements: {
            line: {
              tension: 0,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      var ctx = document.getElementById("Confirmed").getContext("2d");

      let chartStatus_Confirmed = Chart.getChart("Confirmed");

      if (chartStatus_Confirmed != undefined) {
        chartStatus_Confirmed.destroy();
      }

      var Confirmed = new Chart(ctx, {
        type: "line",
        data: {
          labels: Country,
          datasets: [
            {
              label: "Confirmed",

              data: Confirmed,

              backgroundColor: "grey",
              fill: true,
              borderColor: ["grey"],
              borderWidth: 4,
            },
          ],
        },
        options: {
          maintainaspectratio: false,
          elements: {
            line: {
              tension: 0,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      var ctx = document.getElementById("deaths").getContext("2d");

      let chartStatus_deaths = Chart.getChart("deaths");

      if (chartStatus_deaths != undefined) {
        chartStatus_deaths.destroy();
      }

      var deaths = new Chart(ctx, {
        type: "line",

        data: {
          labels: Country,

          datasets: [
            {
              label: "Deaths",
              data: Deaths,
              backgroundColor: "red",
              fill: true,
              borderColor: ["red"],
              borderWidth: 4,
            },
          ],
        },
        options: {
          maintainaspectratio: false,
          elements: {
            line: {
              tension: 0,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  };
});
