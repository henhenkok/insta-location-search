import { memo } from "react";
import { AppInput } from "../../components/AppInput";
import { FormProvider, useForm } from "react-hook-form";
import { useAsyncApi } from "../../utils/async.utils";
import { getLocations } from "../../insta.api";
import { Navigate } from "react-router";

interface SearchFields {
  latitude: number;
  longitude: number;
}

export const MainPage = memo(() => {
  const searchForm = useForm<any>({
    defaultValues: {
      latitude: '',
      longitude: ''
    },
  });
  const { handleSubmit } = searchForm;
  const { call, isLoading, data, error } = useAsyncApi<any>();
  const onSubmit = useMemo(() => handleSubmit((data: SearchFields) => {
    if (!data.latitude || !data.longitude) {
      return;
    }
    call(() => getLocations(data));
  }), [handleSubmit, call]);
  if (localStorage.getItem('ils-data')) {
    return (
      <Navigate to='/search-result'/>
    );
  }
  if (data) {
    const request = searchForm.getValues();
    localStorage.setItem('ils-data', JSON.stringify({ request, data }));
    return (
      <Navigate to='/search-result'/>
    );
  }
  if (error) {
    console.log('Fetch error', error);
  }
  return (
    <div>
      {error && (<div>Error: {JSON.stringify(error)}</div>)}
      <FormProvider {...searchForm}>
        <form onSubmit={onSubmit}>
          <div className='d-flex align-items-center'>
            <AppInput name="latitude" label="Latitude" required type="number"/>
            <AppInput name="longitude" label="Longitude" className="mx-2" required type="number"/>
            <div>
              <button type="submit" className="btn btn-secondary btn-sm" disabled={isLoading}>Search</button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
});