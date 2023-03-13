import { Topic } from '../../../../menus/topicMenu/topics'
import { NearbyPlaceAPIInput } from '../../../../../../api/nearbyPlaces/nearbyPlaceAPIInput'

export class FilterDefaultValues{
    
    private topicToDefaultValue = new Map<Topic, NearbyPlaceAPIInput>();
    
    constructor(){
        this.topicToDefaultValue.set(Topic.Food, new NearbyPlaceAPIInput("Bakery"));
        this.topicToDefaultValue.set(Topic.Health, new NearbyPlaceAPIInput("Pharmacy"));
        this.topicToDefaultValue.set(Topic.Transport, new NearbyPlaceAPIInput("Gas Station"));
        this.topicToDefaultValue.set(Topic.Religion, new NearbyPlaceAPIInput("Church"));
        this.topicToDefaultValue.set(Topic.Recreation, new NearbyPlaceAPIInput("Store"));
        this.topicToDefaultValue.set(Topic.Education, new NearbyPlaceAPIInput("University"));
    }
    
    public get(topic) {
        return this.topicToDefaultValue.get(topic)
    }

}