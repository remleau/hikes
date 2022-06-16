import { useState } from "react";
import { useFormik } from "formik";
import { useData } from "/components/utils/DataContext";

import * as Yup from "yup";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

import SubHero from "/components/subHero";
import GooglePhotosFrame from "/components/GooglePhotosFrame";

import { LayoutContainer } from "/components/layout";
import { Input, FormError, SuccesLink, ImportFiles } from "/components/form";
import { useEffect } from "react";

export default function () {
  const [googlePlaceValue, setGooglePlaceValue] = useState(null);
  const [formError, setFormError] = useState(null);
  const { addHike } = useData();

  const formik = useFormik({
    initialValues: {
      hike_name: "",
      kilometer: "",
      files: [],
      location: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      hike_name: Yup.string().required("The name is required"),
      kilometer: Yup.number()
        .typeError("You must specify a number")
        .min(1)
        .required("You must specify a number"),
    }),
    onSubmit(values) {
      addHike(values).then((rep) => {
        setFormError(<SuccesLink link={rep} />);
        formik.resetForm({
          ...formik.initialValues,
        });
      });
    },
  });

  useEffect(() => {
    googlePlaceValue &&
      geocodeByAddress(
        googlePlaceValue?.value?.structured_formatting?.secondary_text
      )
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) =>
          formik.setFieldValue("location", {
            mountain_name:
              googlePlaceValue?.value?.structured_formatting?.main_text,
            mountain_id: googlePlaceValue?.value?.place_id,
            adress:
              googlePlaceValue?.value?.structured_formatting?.secondary_text,
            lat: lat,
            lng: lng,
          })
        );
  }, [googlePlaceValue]);

  return (
    <LayoutContainer pageClasse="settingsPage" api="">
      <SubHero pageTitle="Add a quick hike." />

      <form
        onSubmit={formik.handleSubmit}
        className="userDataForm"
        encType="multipart/form-data"
      >
        <div className="formDescription">
          <p>My awesome hike!</p>
        </div>

        {formError && <FormError error={formError} />}

        <div className="fields">
          <div className="flex">
            <label htmlFor="" className="w-1/2">
              <span>
                Name of your Hike. <sup>*</sup>
              </span>
              <Input
                onChange={formik.handleChange}
                value={formik.values.hike_name}
                touched={formik.touched.hike_name}
                error={formik.errors.hike_name}
                placeholder="Ex: Lorem ipsum dolar sit amet"
                name="hike_name"
                type="text"
              />
            </label>

            <label htmlFor="" className="w-1/2">
              <span>Number of kilometers traveled.</span>
              <Input
                onChange={formik.handleChange}
                value={formik.values.kilometer}
                touched={formik.touched.kilometer}
                error={formik.errors.kilometer}
                name="kilometer"
                type="text"
              />
            </label>
          </div>

          <div className="flex">
            <div className="w-1/2 flex">
              <label htmlFor="files" className="w-1/2 mr-4">
                <span>Digital memories.</span>
                <div>
                  <ImportFiles
                    onChange={formik.handleChange}
                    value={formik.values.files}
                    touched={formik.touched.files}
                    error={formik.errors.files}
                    formik={formik}
                    name="files[]"
                    type="file"
                    id="files"
                  />
                </div>
              </label>
              <GooglePhotosFrame />
            </div>

            <label className="w-1/2">
              <span>Location.</span>
              <div className="googlePlaces">
                <GooglePlacesAutocomplete
                  apiKey={process.env.googleMapsKey}
                  apiOptions={{ language: "en" }}
                  selectProps={{
                    googlePlaceValue,
                    onChange: setGooglePlaceValue,
                    placeholder: "ex: mount washington",
                  }}
                  autocompletionRequest={{
                    types: ["natural_feature"],
                  }}
                />
              </div>
            </label>
          </div>
        </div>

        <div className="action">
          <button
            type="submit"
            className={`btn ${
              Object.keys(formik.errors).length === 0 ? "" : "disabled"
            }`}
          >
            Create
          </button>
        </div>
      </form>
    </LayoutContainer>
  );
}
