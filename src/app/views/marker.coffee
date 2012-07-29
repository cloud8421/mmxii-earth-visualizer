class MmxiiEarth.Views.Marker

  constructor: (@earth, @tweet) ->
    @earthMarker = @earth.initMarker @tweet.geo.coordinates...
    @render()

  template: $('#tweet-template').html()

  render: ->
    popup = Mustache.render(@template, @tweet)
    @earthMarker.bindPopup popup

class MmxiiEarth.Views.MarkersList

  constructor: ->
    @list = []
    @listen()

  add: (marker) ->
    @list.push marker

  hide: ->
    marker.earthMarker.closePopup() for marker in @list

  listen: ->
    $('body')
      .on 'click', '#close-popups', =>
        @hide()
