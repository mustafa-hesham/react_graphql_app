import React, { Component } from "react";
import axios from "axios";

let searchCriteria = "hund";
let limit = 20;

const url = 'https://api.clerk.io/v2/search/search?payload=%7B%22offset%22%3A0%2C%22limit%22%3A+'+limit+'+%2C%22query%22%3A%22+'+searchCriteria+'+3%22%2C%22attributes%22%3A%5B%22entity_id%22%2C%22name%22%2C%22description%22%2C%22price%22%2C%22list_price%22%2C%22image%22%2C%22url%22%2C%22categories%22%2C%22brand%22%2C%22sku%22%2C%22age%22%2C%22on_sale%22%2C%22product_type%22%2C%22product_type%22%2C%22short_description%22%2C%22menge%22%2C%22bestseller%22%2C%22news_from_date%22%2C%22news_to_date%22%2C%22review_count%22%2C%22rating_summary%22%2C%22url_key%22%2C%22id%22%2C%22product_type%22%2C%22stock%22%2C%22list_price%22%2C%22short_description%22%2C%22menge%22%5D%2C%22facets%22%3A%5B%22categories%22%5D%2C%22key%22%3A%22rNjIR5qdAeP8chB6Z3O2OAimA447bcWY%22%2C%22visitor%22%3A%22auto%22%2C%22_%22%3A1658479443%7D&callback=__clerk_cb_7';
const regex = /(<([^>]+)>)/ig;


export default class Product extends Component{
    constructor(props){
        super(props);

        this.state={
            content: ''
        }
    }
    componentDidMount(){
        axios.get(url).then((response) => {
            let result = response['data'].replace(regex, '');
            result = result.substring(13);
            result = result.slice(0, -2);
            result = JSON.parse(result);
            this.setState({content:result["product_data"]})
            console.log(this.state.content);
        });
    }

    render(){
            return(
                <div>
                    <h3>Serach criteria: </h3><h2>{ searchCriteria }</h2>
                    { this.state.content && this.state.content.map((val) => {
                        return <h1>{ val["name"] } - { val["sku"] }</h1>;
                    })}
                </div>
            )
        }
}