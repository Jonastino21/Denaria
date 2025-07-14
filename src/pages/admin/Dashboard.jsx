import React from 'react';
import { Container, Row, Col, Card, Badge, ProgressBar } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { ShoppingCart, Link } from 'lucide-react';
import AnalyticsFont from '../../assets/img/illustrations/card-website-analytics-1.png';
import AnalyticsFont2 from '../../assets/img/illustrations/card-website-analytics-2.png';
import './dashboard.css';
import { dashboardData } from '../../data/dashboardMock';

export default function Dashboard() {
  return (
    <Container fluid className='container flex-grow-1 py-4'>
      <Row className='g-4'>
        
        <Col lg={6}>
          <Card className='bg-primari text-white p-3'>
            <Swiper spaceBetween={20} pagination={{ clickable: true }} autoplay={{ delay: 3000 }} modules={[Pagination, Autoplay]}>
              {dashboardData.analyticsSlides.map((slide, idx) => (
                <SwiperSlide key={idx}>
                  <h5>{slide.title}</h5>
                  <small>Taux de conversion total : {slide.conversionRate}</small>
                  <Row className='mt-3'>
                    <Col lg={7} md={9}>
                      <Row>
                        {slide.stats.map((stat, index) => (
                          <Col xs={6} key={index}>
                            <ul className='list-unstyled mt-3 fs-7'>
                              <li className='d-flex mb-2 align-items-center'>
                                <p className='mb-0 fw-medium me-2 bg-secondary px-2 rounded'>{stat.value}</p>
                                <p className='mb-0'>{stat.label}</p>
                              </li>
                            </ul>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                    <Col lg={5} md={3} className='text-center mt-3 mt-md-0'>
                      <img src={idx === 0 ? AnalyticsFont : AnalyticsFont2} alt={slide.title} height='150' />
                    </Col>
                  </Row>
                </SwiperSlide>
              ))}
            </Swiper>
          </Card>
        </Col>
        <Col xl={3} sm={6} className='px-0'>
          <Card className='h-100'>
            <Card.Header className='pb-0'>
              <h5 className='mb-2'>{dashboardData.averageDailySales.title}</h5>
              <p className='text-muted mb-1'>{dashboardData.averageDailySales.subtitle}</p>
              <h4>{dashboardData.averageDailySales.amount}</h4>
            </Card.Header>
            <Card.Body className='px-0'>
              <svg viewBox='0 0 400 130' width='100%' height='auto'>
                <defs>
                  <linearGradient id='gradient' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0' stopColor='rgba(40,199,111,0.6)' stopOpacity='0.6' />
                    <stop offset='1' stopColor='rgba(212,244,226,0.1)' stopOpacity='0.1' />
                  </linearGradient>
                </defs>
                <path d='M 0 123L 0 61.5C 46.2 61.5 85.8 102.5 132 102.5C 178.2 102.5 217.8 10.25 264 10.25C 310.2 10.25 349.8 41 396 41L396 123Z' fill='url(#gradient)' />
                <path d='M 0 61.5C 46.2 61.5 85.8 102.5 132 102.5C 178.2 102.5 217.8 10.25 264 10.25C 310.2 10.25 349.8 41 396 41' fill='none' stroke='#28c76f' strokeWidth='2' />
              </svg>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card className='h-100'>
            <Card.Header>
              <div className='d-flex justify-content-between'>
                <p className='mb-0 text-muted'>Aperçu des ventes</p>
                <p className='fw-medium text-success mb-0'>{dashboardData.salesOverview.growth}</p>
              </div>
              <p></p>
              <h4>{dashboardData.salesOverview.total}</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={5}>
                  <div className='d-flex gap-2 align-items-center mb-2'>
                    <Badge bg='info'>
                      <ShoppingCart size={12} />
                    </Badge>
                    <p className='mb-0'>Commandes</p>
                  </div>
                  <h5>{dashboardData.salesOverview.orders.percentage}</h5>
                  <small className='text-muted'>{dashboardData.salesOverview.orders.number}</small>
                </Col>
                <Col xs={2} className='d-flex align-items-center justify-content-center'>
                  <div className='border-start border-end px-2'>VS</div>
                </Col>
                <Col xs={5} className='text-end'>
                  <div className='d-flex gap-2 justify-content-end align-items-center mb-2'>
                    <p className='mb-0'>Visites</p>
                    <Badge bg='success'>
                      <Link size={12} />
                    </Badge>
                  </div>
                  <h5>{dashboardData.salesOverview.visits.percentage}</h5>
                  <small className='text-muted'>{dashboardData.salesOverview.visits.number}</small>
                </Col>
              </Row>
              <div className='mt-3'>
                <ProgressBar>
                  <ProgressBar variant='info' now={70} key={1} />
                  <ProgressBar variant='success' now={30} key={2} />
                </ProgressBar>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
