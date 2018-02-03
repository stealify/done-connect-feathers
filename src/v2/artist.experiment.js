// Bring in the feathersClient instance.
import feathersClient from './feathers.experiment';

// models/artists.js
import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/list';
import Connection from 'canjs-feathers';
import moment from 'moment';

// { 'sprache': 'Tongelau', 'rating': 'motherlang' },
//{ 'sprache': 'Deutsch', 'rating': 'wenig' },
//{ 'sprache': 'English', 'rating': 'gut' },
//{ 'sprache': 'Kopffick', 'rating': 'sehr gut' }

const Language = DefineMap.extend('Language',{
  seal: false
},{
  sprache: 'string',
  rating: 'string'
})

Language.List = DefineList.extend('LanguageList',{ '#': Language })


const Artist = DefineMap.extend('Artist',{
  seal: false
}, {
  _id: '*',
  vorname: 'string',
  zweitername: 'string',
  nachname: 'string',
  origin: 'string',
  adresse: 'string',
  languages: 'string', // -&gt; scrolldown Menue → z.B. Englisch auswaehlbar wenig, gut, sehr gut (Auswahllisten mit Mehrfachauswahl)
  Meldezettel: 'string',
  PassCopy: 'string',
  Behoerdencontrollen: [
    { _id: 3 }
  ],
  signing: 'string',
  lowerAge: 5,
  pircingintim: true,
  pircingbrust: true,
  tatoo: true,
  bodysize:'string',
  bhsize:'string',
  weight:'string',
  haircolor: 'string',
  hairlength: 'string',
  /**
	 * @property {String} models/artist.properties.birthday birthday
	 * @parent models/artist.properties
	 *
	 * The artist's date of birth. Formatted as `YYYY-MM-DD`.
	 **/
	birthday: 'any',
  /**
   * @property {Date|null} models/artist.properties.jsBirthday jsBirthday
   * @parent models/artist.properties
   *
   * The [models/artist.properties.birthday birthday] property
   * represented as a JavaScript object.
   **/
  get jsBirthday() {
    var date = this.birthday;
    return date ? new Date(date) : null;
  },
  /**
   * @property {String} models/artist.properties.birthDate birthDate
   * @parent models/artist.properties
   *
   * The [models/artist.properties.birthday birthday] property
   * formatted as `YYYY-MM-DD`.
   **/
  get birthDate() {
    var date = this.birthday;
    return date ? moment(date).format('YYYY-MM-DD') : "";
  },
  set birthDate(value) {
    this.birthday = value;
  },
  /**
   * @property {Number} models/artist.properties.age age
   * @parent models/artist.properties
   *
   * The number of full years since the date of the
   * [models/artist.properties.jsBirthday jsBirthday] property.
   * Substracting [models/artist.properties.lowerAge lowerAge] property.
   **/
  get age() {
    var birthDate = this.jsBirthday;
    if(birthDate) {
      var today = new Date();
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age - this.lowerAge;
    }
  },
  createItem: (where, item) => {
    where.create(item);
    return where.find();
  },
  deleteItem: (where, item) => {
    where.create(item);
    return where.find();
  },
  test: function name() {
    console.log('CAKK2')
    // deleteItem(Artists,page.data[1]._id)
    return this.createItem(Artist,{
      name: 'Test user',
      text: 'Hello world!',
      birthday: '18-08-2012'
    }).then(page => { this.Artist = page; return Artist.find(); }).then(page => console.log('Current Artists are', this.Artists)).catch(e => {
      console.log(e)
    });
  }
});


/**
 * @constructor {can-list} models/artist.static.List List
 * @parent models/artist static
 */
Artist.List = DefineList.extend('ArtistList',{
    '#': Artist,
    /**
	 * @property {Object}
	 *
	 * A map of artist ids to [models/artist] models.
	 **/
	get idMap() {
		var map = {};
		this.each(function(artist){
			map[artist._id] = artist;
		});

		return map;
	},
	/**
	 * @function
	 *
	 * Returns a Artist in the list of artists given its id.
	 *
	 * @param {Number} id
	 * @return {models/artist|undefined} The artist if it exists.
	 */
	getById: function(id){
		return this.idMap[id];
	}
});

 // Use feathersClient.service(url) to create a service
 const artistService = feathersClient.service('/artists');

 // Combine the best of both CanJS and Feathers.
 Artist.connection  = new Connection({
     service: artistService,
     idProp: '_id',
     Map: Artist
 });

//tag("artist-model", connection);

export default Artist;
