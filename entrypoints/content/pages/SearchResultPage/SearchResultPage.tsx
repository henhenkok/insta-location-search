import { memo } from "react";
import { Navigate, useNavigate } from "react-router";
import { GetLocationsRequest } from "../../insta.api";
import { downloadObjectAsJson } from "../../utils/download.utils";
import { useJson } from "../../utils/json.utils";

interface SearchData {
  request: GetLocationsRequest;
  data: any;
}

export const SearchResultPage = memo(() => {
  const searchJson: SearchData | null = useJson(localStorage.getItem('ils-data'));
  const onDownload = useCallback(() => {
    if (!searchJson) {
      return;
    }
    const features = searchJson.data.venues.map((it: any) => ({
      "type": "Feature",
      "geometry": {"type": "Point", "coordinates": [it["lng"], it["lat"]]},
      properties: {
        link: `https://www.instagram.com/explore/locations/${it['external_id']}`,
        name: it.name,
        address: it.address,
      },
    }));
    downloadObjectAsJson({
      "type": "FeatureCollection",
      features,
    }, 'export');
  }, [searchJson]);
  const navigate = useNavigate();
  const onClear = useCallback(() => {
    localStorage.removeItem('ils-data');
    navigate('/');
  }, [navigate]);
  if (!searchJson) {
    return (<Navigate to='/'/>);
  }
  return (
    <div>
      <div>{searchJson.request.latitude}, {searchJson.request.longitude}</div>
      <div>Status: {searchJson.data.status}</div>
      <div>
        <button className="btn btn-secondary btn-sm mx-2" onClick={onDownload}>Download</button>
        <button className="btn btn-secondary btn-sm" onClick={onClear}>clear</button>
      </div>
    </div>
  );
});