export class Searchflight {
    constructor(
        public booking_type: String,
        public source_airport_id : Number,
        public destination_airport_id : Number,
        public departure_date:Date,
        public return_date:Date,
        public adults:Number,
        public childs:Number,
        public infants:Number,
        public class_type:String
    ){}
}
