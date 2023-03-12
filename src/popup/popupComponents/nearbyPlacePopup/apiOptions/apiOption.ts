import { Topic } from '../../topicMenu/topics'
import { NearbyPlaceAPIInput } from '../../../../api/nearbyPlaces/nearbyPlaceAPIInput'

export class APIOption{
    
    private hashmap = new Map<Topic, NearbyPlaceAPIInput>();


    constructor(){
        this.hashmap.set(Topic.Food, new NearbyPlaceAPIInput("Bakery", "Bakery"));
        this.hashmap.set(Topic.Health, new NearbyPlaceAPIInput("Hospital", "Hospital"));
        this.hashmap.set(Topic.Transport, new NearbyPlaceAPIInput("Train Station", "Train Station"));
        this.hashmap.set(Topic.Religion, new NearbyPlaceAPIInput("Church", "Church"));
        this.hashmap.set(Topic.Recreation, new NearbyPlaceAPIInput("Gym", "Gym"));
        this.hashmap.set(Topic.Education, new NearbyPlaceAPIInput("University", "University"));
    }
    
    public get(topic) {
        return this.hashmap.get(topic)
    }

    

    
}