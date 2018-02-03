import set from 'can-set';
import moment from "moment";

/**
 * Feathers-compatible can-set algebra for can-connect Models.
 */
//  set.props.offsetLimit('$skip', '$limit'),
export default new set.Algebra(
  set.props.id('_id'),
  set.comparators.enum('status', [
    'new', 'preparing', 'delivery', 'delivered'
  ]),
  set.comparators.sort("$sort", function($sort, cm1, cm2){
    if($sort.date) {
      if(parseInt($sort.date, 10) === 1) {
        return moment(cm1.date).toDate() - moment(cm2.date).toDate();
      }
      return moment(cm2.date).toDate() - moment(cm1.date).toDate();
    }
    throw "can't sort that way";
  }),
  {
    "$populate": function(){
      return true;
    },
    "token": function(){
      // token is added by feathers
      return true;
    }
  }
);