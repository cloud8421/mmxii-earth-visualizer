class MmxiiEarth.Views.Marker

  constructor: (@earth, @tweet) ->
    @earthMarker = @earth.initMarker(@tweet.interaction.geo.latitude, @tweet.interaction.geo.longitude)
    @render()

  template: $('#tweet-template').html()

  render: ->
    @tweet.created_at = @humanizeDate(@tweet.interaction.created_at)
    # @tweet.text = @tweet.text.parseURL().parseUsername().parseHashtag()
    popup = Mustache.render(@template, @tweet)
    @earthMarker.bindPopup popup, 400, false

  rotateToMarker: ->
    @earth.flyTo @tweet.interaction.geo.latitude, @tweet.interaction.geo.longitude
    @earthMarker.openPopup()

  humanizeDate: (created_at) ->
    date = new Date(created_at)
    moment(date).calendar()

class MmxiiEarth.Views.MarkersList

  started: false

  constructor: ->
    @list = []
    @listen()

  add: (marker) ->
    @list.push marker
    @start() unless @started

  start: ->
    @rotate()
    setInterval =>
      @rotate()
    , 8000
    @started = true

  hide: ->
    marker.earthMarker.closePopup() for marker in @list

  listen: ->
    $('body')
      .on 'click', '#close-popups', =>
        @hide()
      .on 'click', '#next-marker', =>
        @rotate()

  rotate: =>
    @hide()
    cm = @list.shift()
    @list.push cm
    cm.rotateToMarker()
