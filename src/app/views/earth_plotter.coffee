class MmxiiEarth.Views.EarthPlotter

  constructor: (@tweets)->
    options =
      zoom: 0.2,
      position: [51.3051, -1.0543]
    @earth = new WebGLEarth('container', options)

  plot: ->
    console.log "Plotting #{@tweets.length} tweets..."
    @markersList = new MmxiiEarth.Views.MarkersList
    for tweet in @tweets
      do (tweet) =>
        @markersList.add (new MmxiiEarth.Views.Marker @earth, tweet)
