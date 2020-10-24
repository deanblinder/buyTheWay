
import React,{Component} from 'react';
// import classes from './GoogleAutoComplete.css'
import './GoogleAutoComplete.css'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

class LocationSearchInput extends Component {
    constructor(props) {
        super(props);
        this.state={
            address:'',
            myLat:'',
            myLng:''

        };
    }
        handleChange = address => {
            this.setState({ address });
        };
        updateState=(lat,lng,address)=>{
            this.setState({myLat:lat,myLng:lng,address:address})
            // console.log(this.state.myLat,this.state.myLng,this.state.address,'====')
            this.props.placeLatlng(this.state.myLat, this.state.myLng,this.state.address);
        }
        handleSelect = address => {
            geocodeByAddress(address)
                .then(results => getLatLng(results[0]))
                .then(latLng => this.updateState(latLng.lat,latLng.lng,address))
                .catch(error => console.error('Error', error));
            this.setState({address:address})


        };

        render() {
            return (
                <div className='locationSearchInput'>
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input
                                   {...getInputProps({
                                       placeholder: 'Location',
                                       className : 'locationSearchInput',
                                   })}
                            />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    // const className = 'inputSuggestion'
                                    //     ? 'suggestion-item--active'
                                    //     : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div className='inputSuggestion'
                                             {...getSuggestionItemProps(suggestion, {
                                                 style,
                                             })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
                </div>
            );
        }

}
export default LocationSearchInput;