class MmxiiEarth.Views.Marker

  constructor: (@earth, @tweet) ->
    @earthMarker = @earth.initMarker @tweet.geo.coordinates...
    @render()

  template: $('#tweet-template').html()

  render: ->
    @tweet.created_at = @humanizeDate(@tweet.created_at)
    popup = Mustache.render(@template, @tweet)
    @earthMarker.bindPopup popup, 400, false

  rotateToMarker: ->
    @earth.flyTo @tweet.geo.coordinates...
    @earthMarker.openPopup()

  humanizeDate: (created_at) ->
    date = new Date(created_at)
    moment(date).calendar()

class MmxiiEarth.Views.MarkersList

  constructor: ->
    @list = []
    @listen()
    setInterval =>
      @rotate()
    , 5000

  add: (marker) ->
    @list.push marker

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
