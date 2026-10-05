import type { Enquiry } from '../../types/enquiry';
import EnquiryCard from './EnquiryCard';

interface EnquiryListProps {
  enquiries: Enquiry[];
  isSelectionDisabled: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function EnquiryList({ enquiries, isSelectionDisabled, onSelect, selectedId }: EnquiryListProps) {
  return (
    <div aria-busy={isSelectionDisabled} className="grid gap-4">
      {enquiries.map((enquiry) => (
        <EnquiryCard
          enquiry={enquiry}
          isSelected={selectedId === enquiry.id}
          isSelectionDisabled={isSelectionDisabled}
          key={enquiry.id}
          onSelect={() => onSelect(enquiry.id)}
        />
      ))}
    </div>
  );
}

export default EnquiryList;
