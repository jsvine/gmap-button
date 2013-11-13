(function (gmaps) {
	var root = this;

    /* Main function for creating buttons.
     * 
     * First argument, `map`, should be a `google.maps.Map` object.
     *
     * Second argument, `opts`, should be a hash with the following properties:
     *
     *  - `html`: the inner HTML for the button
     *
     *  - `onclick`: a callback, triggered when the button is clicked
     *
     *  - `position` (optional, defaults to "TOP_RIGHT"): desired position on the map, from the options described at https://developers.google.com/maps/documentation/javascript/controls#ControlPositioning
     *
     *  - `group` (optional, defaults to none): See `createGroup` below.
     */
    var create = function (map, opts) {
        opts = opts || {};
        var button = document.createElement('div');
        button.innerHTML = opts.html || "⚡";
        button.className = "gmap-button";
        if (opts.onclick) {
            gmaps.event.addDomListener(button, 'click', function () {
                // Pass the map as the sole argument to the callback.
                // The value of the `this` keyword will be the button element. 
                opts.onclick.call(button, map);
            });
        }
        if (opts.group) {
            opts.group.appendChild(button);
        } else {
            var pos = gmaps.ControlPosition[opts.position || "TOP_RIGHT"];
            map.controls[pos].push(button);
        }
        return button;
    };

    /*
     * Similar to `create` but only creates an empty <div>, to which you can add buttons.
     *
     * See the `create`'s `group` option above.
     */
    var createGroup = function (map, opts) {
        opts = opts || {};
        var pos = gmaps.ControlPosition[opts.position || "TOP_RIGHT"];
        var group = document.createElement('div');
        group.className = "gmap-button-group";
        map.controls[pos].push(group);
        return group;
    };

    /*
     * This library comes with two pre-written buttons, below.
     *
     * See http://www.jsvine.com/gmap-button/demo/ for example usage.
     *
     * You can pass the same options as you would with `create`. 
     */
    var undoZoomButton = function (map, opts) {
        var opts = opts || {};
        var history = [ { center: map.getCenter(), zoom: map.getZoom() } ];

        var undoZoom = function () {
            history.pop(); // Toss out current state.
            var previous = history.pop(); // Get previous state.
            map.setCenter(previous.center);
            map.setZoom(previous.zoom);
        };

        var button = create(map, {
            onclick: undoZoom,
            html: opts.html || "Undo Zoom",
            position: opts.position
        });

        button.style.display = "none";

        gmaps.event.addListener(map, 'zoom_changed', function() {
            history.push({ center: map.getCenter(), zoom: map.getZoom() });
            button.style.display = (history.length > 1 ? "inline-block" : "none");
        });

        return button;
    };

    var resetButton = function (map, opts) {
        var opts = opts || {};

        var zoom = map.getZoom();
        var center = map.getCenter();

        var reset = function () {
            map.setCenter(center);
            map.setZoom(zoom);
        };

        var button = create(map, {
            onclick: reset,
            html: opts.html || "Reset Map",
            position: opts.position
        });

        button.style.display = "none";

        gmaps.event.addListener(map, "zoom_changed", function () {
            button.style.display = (map.getZoom() === zoom) ? "none" : "inline-block";
        });

        return button;
    };

    // Export the functions
    root.GMapButton = {
        VERSION: "0.0.1",
        create: create,
        createGroup: createGroup,
        undoZoomButton: undoZoomButton,
        resetButton: resetButton
    };

}).call(this, google.maps); 
