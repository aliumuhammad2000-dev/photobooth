import ServiceCard from './ServiceCard';
import type { PhotographyService } from '../../types/services';

interface ServicesGridProps {
  bookingPath: string;
  services: PhotographyService[];
}

function ServicesGrid({ bookingPath, services }: ServicesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:items-start">
      {services.map((service) => (
        <ServiceCard bookingPath={bookingPath} key={service.id} service={service} />
      ))}
    </div>
  );
}

export default ServicesGrid;
