class MmxiiEarth.Views.EarthPlotter

  defaultAltitude: 9592125

  constructor: (@tweets)->
    options =
      zoom: 0.2
      position: [51.3051, -1.0543]
      altitude: @defaultAltitude
    @earth = new WebGLEarth('earth-container', options)
    @listen()

  plot: ->
    @markersList = new MmxiiEarth.Views.MarkersList
    for tweet in @tweets
      do (tweet) =>
        @markersList.add (new MmxiiEarth.Views.Marker @earth, tweet)

  listen: ->
    $('body')
      .on 'click', '#altitude', (evt) ->
        console.log evt
