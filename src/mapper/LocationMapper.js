const LocationMapper = (data) => {
  const tmp = data.map((province) => {
    return {
      value: province?.id,
      label: province?.name,
      children: province?.districtList?.map((district) => {
        return {
          value: district?.id,
          label: district?.name,
          children: district?.wardList?.map((ward) => {
            return {
              value: ward?.id,
              label: ward?.name,
            };
          }),
        };
      }),
    };
  });

  return tmp;
};

export default LocationMapper;
