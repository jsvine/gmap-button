(function () {

    var code_els = document.querySelectorAll(".example code");

    var exemplify = function (fn, code_el) {
        fn.call(fn);
        var str = fn.toString();
        var lines = str.split("\n").slice(1, -1);
        var start_index = lines[0].match(/[^\s].*$/).index;
        var trimmed = lines.map(function (x) {
            return x.slice(start_index);
        }).join("\n");
        code_el.innerHTML = trimmed;
    };

    var map_options = {
        center: new google.maps.LatLng(40.7049008, -74.0060661),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        panControl: false,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        scrollwheel: false
    };

    var _map = Array.prototype.map;

    // Initialize the maps.
    var map_divs = document.querySelectorAll(".map");
    var maps = _map.call(map_divs, function (div) {
        return new google.maps.Map(div, map_options);
    });

    // Add a button to the first map
    exemplify(function () { 
        // Note: all `maps` elements are standard `google.maps.Map` objects.

        var test_button = GMapButton.create(maps[0], {
            html: "Click Me",
            onclick: function () {
                alert("Huzzah!");
            }
        });
    }, code_els[0]);

    // With the second map, demonstrate button groups
    exemplify(function () { 
        var button_group = GMapButton.createGroup(maps[1]);

        var test_button = GMapButton.create(maps[1], {
            group: button_group,
            html: "Get Zoom",
            onclick: function (map) {
                alert("Zoom level is: " + map.getZoom());
            }
        });

        var another_test_button = GMapButton.create(maps[1], {
            group: button_group,
            html: "Get Lat/Lng",
            onclick: function (map) {
                var ll = map.getCenter().toString().slice(1, -1);
                alert("Lat/Lng is: " + ll);
            }
        });
    }, code_els[1]);

    // With the third map, demonstrate Undo Zoom button, and alternative placement;
    exemplify(function () { 
        var undo_button = GMapButton.undoZoomButton(maps[2]);
    }, code_els[2]);

    // With the fourth map, demonstrate Reset Zoom button;
    exemplify(function () { 
        var reset_button = GMapButton.resetButton(maps[3], {
            position: "TOP_CENTER"
        });
    }, code_els[3]);

}).call(this);
