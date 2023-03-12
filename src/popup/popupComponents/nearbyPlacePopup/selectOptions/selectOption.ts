import { Topic } from '../../menu/topics'
import { NearbyPlaceAPIInput } from '../../../../api/nearbyPlaces/nearbyPlaceAPIInput'
import {FoodType} from './types/foodType'
import { HealthType } from './types/healthType'
import { TransportType } from './types/transportType'

import { ReligionType } from './types/religionType'
import { RecreationType } from './types/recreationType'
import { EducationType } from './types/educationType'

export class SelectOption{
    
    private hashmap = new Map<Topic, Array<String>>();


    constructor(){
        this.hashmap.set(Topic.Food, Object.values(FoodType));
        this.hashmap.set(Topic.Health, Object.values(HealthType));
        this.hashmap.set(Topic.Transport, Object.values(TransportType));
        this.hashmap.set(Topic.Religion, Object.values(ReligionType));
        this.hashmap.set(Topic.Recreation, Object.values(RecreationType));
        this.hashmap.set(Topic.Education, Object.values(EducationType));
    }
    
    public get(topic) {
        return this.hashmap.get(topic)
    }

    

    
}