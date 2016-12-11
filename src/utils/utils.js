//Format the JSON file according to expectations
export const formatJSON = (json) => {
  let data = {};
  let name;
  let properties;

  json.map(obj => {
    //handle General Info
    if (obj["containing_object"] === undefined) {
      if (!data["general_info"]) {
        data["general_info"] = {};
      }
      return data["general_info"][obj.name] = obj;
    }

    name = obj["containing_object"]["name"]
    //handle the rest
    data[name] = {};
    properties = obj["containing_object"]["properties"];
    properties.map(prop => {
      return data[name][prop.name] = prop;
    });
  });
  return data;
};

//Format a JSON string - replace underscores with spaces, and make first letter capitalized
export const formatCategory = (category) => {
  category = category.replace(/[_-]/g, " "); 
  category = category.replace(/\b\w/g, l => l.toUpperCase());
  return category;
}
