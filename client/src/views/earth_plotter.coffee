class MmxiiEarth.Views.EarthPlotter

  defaultAltitude: 9592125

  constructor: ->
    options =
      zoom: 0.2
      position: [51.3051, -1.0543]
      altitude: @defaultAltitude
    @earth = new WebGLEarth('earth-container', options)
    @markersList = new MmxiiEarth.Views.MarkersList
    $.subscribe 'new_tweet', (evt, tweet) =>
      @markersList.add (new MmxiiEarth.Views.Marker @earth, tweet)
