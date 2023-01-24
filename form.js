let autocomplete;
let address1Field;
let postalField;

function initAutocomplete() {
    address1Field = document.querySelector("#autoComplete");
    postalField = document.querySelector("#postcode");

    autocomplete = new google.maps.places.Autocomplete(address1Field, {
        componentRestrictions: { country: ["nz"] },
        fields: ["address_components", "geometry"],
        types: ["address"],
    });
    address1Field.focus();

    autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
    const place = autocomplete.getPlace();
    let address1 = "";
    let postcode = "";

    console.log(place);

    for (const component of place.address_components) {

        const componentType = component.types[0];

        switch (componentType) {
            case "street_number": {
                address1 = `${component.long_name} ${address1}`;
                break;
            }

            case "route": {
                address1 += component.short_name;
                break;
            }

            case "postal_code": {
                postcode = `${component.long_name}${postcode}`;
                break;
            }

            case "postal_code_suffix": {
                postcode = `${postcode}-${component.long_name}`;
                break;
            }
            case "locality":
                document.querySelector("#city").value = component.long_name;
                break;
            case "sublocality_level_1": {
                document.querySelector("#region").value = component.long_name;
                break;
            }
            case "country":
                document.querySelector("#country").value = component.long_name;
                break;
        }

        if( document.querySelector("#region").value == "" ){
            switch( componentType ){
                case "administrative_area_level_1":
                    document.querySelector("#region").value = component.long_name;
                    break;
            }
        }
    }

    address1Field.value = address1;
    postalField.value = postcode;

//   address2Field.focus();
}

window.initAutocomplete = initAutocomplete;