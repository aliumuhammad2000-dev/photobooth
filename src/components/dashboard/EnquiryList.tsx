import type { Enquiry } from '../../types/enquiry';
import EnquiryCard from './EnquiryCard';

interface EnquiryListProps {
  enquiries: Enquiry[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function EnquiryList({ enquiries, onSelect, selectedId }: EnquiryListProps) {
  return (
    <div className="grid gap-4">
      {enquiries.map((enquiry) => (
        <EnquiryCard
          enquiry={enquiry}
          isSelected={selectedId === enquiry.id}
          key={enquiry.id}
          onSelect={() => onSelect(enquiry.id)}
        />
      ))}
    </div>
  );
}

export default EnquiryList;
