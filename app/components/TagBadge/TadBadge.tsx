import * as React from 'react';

interface Props {
    id: string;
    label: string
}

const availableColors = ["blue", "cyan", "sky", "indigo", "fuchsia", "purple", "pink", "violet"]

// TODO: Enable going to $tagId.tsx by clicking on the tag
const TagBadge: React.FC<Props> = (props) => {

    const randomColorChosen = availableColors[Math.floor(Math.random()*availableColors.length)];

    return (
        <div className={`text-${randomColorChosen}-800 bg-${randomColorChosen}-100 rounded-full pl-2 pr-3 py-1 w-fit text-body-sm`}>• {props.label}</div>
    )
}

export default TagBadge




