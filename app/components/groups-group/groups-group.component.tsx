'use client'

// library
import { ChangeEvent, FC, useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";

// types
import { Group, ProductGrouping } from "@/app/api/api-types";
import { ProductFormData } from "../product-form/product-form.component";

type GroupsGroupProps = {
  groups: Group[];
  productGroupings?: ProductGrouping[];
  register: UseFormRegister<ProductFormData>;
};

const GroupsGroup: FC<GroupsGroupProps> = ({ 
  groups, productGroupings, register
}) => {
  // state
  const [ groupings, setGroupings ] = useState<ProductGrouping[]>([]);
  const [ groupingsLoaded, setGroupingsLoaded ] = useState(false);
  const [ contentLoaded, setContentLoaded ] = useState(false);

  // convert groups to productGroupings
  useEffect(() => {
    if (!groupings.length) {
      const convertToProductGrouping = (group: Group): ProductGrouping => {
        return { 
          group_id: group.id, 
          group_name: group.name
        };
      };

      groups.map((group) => {
        const grouping = convertToProductGrouping(group);
        setGroupings((prevGroupings) => {
          return [
            ...prevGroupings,
            grouping
          ]
        })
      })
    }
    // ensures this useEffect runs first
    setGroupingsLoaded(true);
  }, [ groups, groupings, productGroupings ]);

  // merge groups with productGroupings
  useEffect(() => {
    if (groupingsLoaded) {
      var mergedGroupings: ProductGrouping[] = [];

      for (let i = 0; i < groupings.length; i++) {
        const currentGrouping = groupings[i];
        const matchingGrouping = productGroupings?.find((
          grouping) => grouping.group_id === groupings[i].group_id
        );

        const newGrouping = {
          ...currentGrouping,
          ...matchingGrouping,
          _destroy: matchingGrouping?.id ? false : true
        };

        mergedGroupings.push(newGrouping);
      }

      setGroupings(mergedGroupings);
      setGroupingsLoaded(true);
      setContentLoaded(true);
    }
  }, [ productGroupings, groupingsLoaded ]);

  // handler
  const handleCheckboxChange = (
    index: number
  ) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    // check if box is selected
    const isChecked = e.target.checked;

    // copy groupings
    const updatedGroupings = [ ...groupings ];

     // add destroy flag
     updatedGroupings[index] = { ...updatedGroupings[index], _destroy: !isChecked };

     // update groupings
     setGroupings(updatedGroupings);
  };

  return (
    <section className="groups-group">
      <h2 className="groups-group__header">Product Groups</h2>

      { contentLoaded && 
        <ul className="groups-group__list">
          { groupings.map((grouping, index) => 
            <li 
              key={ grouping.group_id }
              className="groups-group__item"
            >
              <input
                id={ `group-id-${ grouping.group_id }` }
                type="checkbox" 
                className="groups-group__checkbox"
                onChange={ handleCheckboxChange(index) }
                defaultChecked={ !!grouping.id }
              />
              <input
                type="hidden" 
                value={ grouping.group_id }
                { ...register(
                  `product.product_groupings_attributes.${ index }.group_id`
                )}
              />
              <label 
                htmlFor={ `group-id-${ grouping.group_id }` }
                className="groups-group__label"
              >
                { grouping.group_name }
              </label>

              { grouping.id && 
                <input 
                  type="hidden" 
                  value={ grouping.id } 
                  { ...register(`product.product_groupings_attributes.${ index }.id`) }
                />
              }

              { grouping._destroy &&
                  <input 
                    type="hidden"
                    value={ grouping._destroy.toString() }
                    { ...register(`product.product_groupings_attributes.${ index }._destroy`) }
                  />
              }
            </li>  
          )}
        </ul>
      }
    </section>
  )
};

export default GroupsGroup;