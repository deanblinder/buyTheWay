import React from 'react';
import PlacesAutocomplete from 'react-autocomplete-places';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-autocomplete-places';
class LocationSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { address: '' };
    }
    handleChange = address => {
        this.setState({ address });
    };
    handleSelect = address => {
        this.setState({address:address})
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => this.props.setLatLang(latLng,this.state.address))
            // .then(latLng => console.log('Success', results))
            .catch(error => console.error('Error', error));
    };
    render() {
        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input style={{width:'100%',border:'solid',borderWidth:'1px',height:'30px',borderRadius:'1%',borderColor:"grey"}}
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
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
        );
    }
}
export default LocationSearchInput;