import { Topic } from '../../../../../menus/topicMenu/topics'
import {FoodType} from './types/foodType'
import { HealthType } from './types/healthType'
import { TransportType } from './types/transportType'
import { ReligionType } from './types/religionType'
import { RecreationType } from './types/recreationType'
import { EducationType } from './types/educationType'

export class FilterTypeOption{
    
    private topicToTypeOptions = new Map<Topic, Array<String>>();

    constructor(){
        this.topicToTypeOptions.set(Topic.Food, Object.values(FoodType));
        this.topicToTypeOptions.set(Topic.Health, Object.values(HealthType));
        this.topicToTypeOptions.set(Topic.Transport, Object.values(TransportType));
        this.topicToTypeOptions.set(Topic.Religion, Object.values(ReligionType));
        this.topicToTypeOptions.set(Topic.Recreation, Object.values(RecreationType));
        this.topicToTypeOptions.set(Topic.Education, Object.values(EducationType));
    }
    
    public get(topic) {
        return this.topicToTypeOptions.get(topic)
    }

}