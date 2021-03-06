/**
 * @class THREEFAB.OutlinerView
 *
 * @author itooamaneatguy / http://kadrmasconcepts.com/blog/
 * @description Setup outliner view.
 *
 */


THREEFAB.OutlinerView = Backbone.View.extend({
	
	el: document.createElement('li'),
	select: document.createElement('select'),

	initialize: function() {

		_.bindAll(this);
		
		this.el = $(this.el);
		
		this.select = $(this.select);
		this.el.append(this.select);
		this.select.bind('change', this.change);

		$.subscribe( THREEFAB.Events.VIEWPORT_OBJECT_ADDED, this.render );
		$.subscribe( THREEFAB.Events.VIEWPORT_OBJECT_REMOVED, this.render );
		
		$.subscribe(THREEFAB.Events.VIEWPORT_MESH_SELECTED, this.updateSelected);
		$.subscribe(THREEFAB.Events.VIEWPORT_LIGHT_SELECTED, this.updateSelected);
	},


	render: function(scene) {
				
		this.select.empty();
		this.addOptions( scene.children );

	},

	change: function() {

		$.publish( THREEFAB.Events.OUTLINER_CHANGED, this.select.val() );
	},

	updateSelected: function(object) {
		
		var name = object.name;
		this.select.val(name);

	},


	addOptions: function(children) {

		var opt;
		
		for(var i=0, len = children.length; i < len; i++) {
		
			if(children[i].name && children[i].name !== 'THREE.PointLight' && children[i].name !== 'THREE.SpotLight' && children[i].name !== 'THREE.AmbientLight') {

				opt = document.createElement('option');
				opt.innerHTML = children[i].name;
				opt.setAttribute('value', children[i].name);
				this.select.append(opt);
			}

		}
		
	}

});