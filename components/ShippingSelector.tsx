import Image from "next/image";

interface ShippingSelectorProps {
  rates: any[];
}

interface ShippingSelectorOptionProps {
  rate: any;
}

const ShippingSelectorOption = ({ rate }: ShippingSelectorOptionProps) => {
  return (
    <div>
      <Image
        src={rate.provider_image_200}
        width={75}
        height={75}
      />
      <div>{rate.provider}</div>
      <div>{rate.servicelevel.name}</div>
      <div>Estimated delivery - {rate.estimated_days} days</div>
      <div>${rate.amount_local}</div>
    </div>
  )
}

const ShippingSelector = ({ rates }: ShippingSelectorProps) => {
  return (
    <div>
      {rates.map((rate: any, i: number) => {
        return (
          <ShippingSelectorOption
            key={i}
            rate={rate}
          />
        )
      })}
    </div>
  )
}

export default ShippingSelector;